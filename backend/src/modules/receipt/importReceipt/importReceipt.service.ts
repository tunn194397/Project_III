import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {
    ImportItemReceipt,
    ImportReceipt,
    Item, Supply, Warehouse,
} from "../../../database/entities";
import {Repository} from "typeorm";
import {FindReceiptDto} from "./dto/findReceipt.dto";
import {CreateImportReceiptDto} from "./dto/createImportReceipt.dto";
import {CreateImportItemReceiptDto} from "./dto/createImportItemReceipt.dto";
import {UpdateImportReceiptDto} from "./dto/updateImportReceipt.dto";
import {UpdateImportItemReceiptDto} from "./dto/updateImportItemReceipt.dto";
import {UpdateTotalImportReceiptDto} from "./dto/updateTotalImportReceipt.dto";
import {FindHomeDataDto} from "../../item/dto/findHomeData.dto";

@Injectable()
export class ImportReceiptService {
    constructor(
        @InjectRepository(ImportReceipt)
        private importReceiptRepository: Repository<ImportReceipt>,

        @InjectRepository(ImportItemReceipt)
        private importItemReceiptRepository: Repository<ImportItemReceipt>,

        @InjectRepository(Item)
        private itemRepository: Repository<Item>,


        @InjectRepository(Supply)
        private supplyRepository: Repository<Supply>,

        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,
    ) {}

    async getList(findReceiptDto: FindReceiptDto ) {
        const {page, pageSize, supplyId, minPrice, maxPrice, minSaleOff, maxSaleOff, searchString, orderField, orderBy} = findReceiptDto
        console.log("debug", minPrice, maxPrice, minSaleOff, maxSaleOff, supplyId)
        let qb = this.importReceiptRepository.createQueryBuilder('ir')
            .select([
                'ir.id as id',
                'ir.supply_id as supplyId',
                'ir.total_price as totalPrice',
                'ir.content as content',
                'ir.note as note',
                'ir.sale_off as saleOff',
                'ir.final_price as finalPrice',
                'ir.updatedAt as updatedAt'
            ])
            .where('ir.final_price >= :minPrice and ir.finalPrice <= :maxPrice', {minPrice: minPrice, maxPrice: maxPrice})
            .andWhere('ir.sale_off >= :minSaleOff and ir.sale_off <= :maxSaleOff', {minSaleOff: minSaleOff, maxSaleOff: maxSaleOff})
            .andWhere('ir.content like :searchString', {searchString: `%${searchString}%`})
            .andWhere('ir.note like :searchString', {searchString: `%${searchString}%`})

        let paginationQb = this.importReceiptRepository.createQueryBuilder('ir')
            .select([
                'count(ir.id) as totalItem'
            ])
            .where('ir.final_price >= :minPrice and ir.final_price <= :maxPrice', {minPrice: minPrice, maxPrice: maxPrice})
            .andWhere('ir.sale_off >= :minSaleOff and ir.sale_off <= :maxSaleOff', {minSaleOff: minSaleOff, maxSaleOff: maxSaleOff})
            .andWhere('ir.content like :searchString', {searchString: `%${searchString}%`})
            .andWhere('ir.note like :searchString', {searchString: `%${searchString}%`})

        if (supplyId && supplyId !== 0) {
            qb =qb.andWhere('ir.supply_id = :supplyId', {supplyId: supplyId})
            paginationQb = paginationQb.andWhere('ir.supply_id = :supplyId', {supplyId: supplyId})
        }

        if (orderField === 'finalPrice') qb = qb.orderBy('ir.final_price', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'saleOff') qb = qb.orderBy('ir.sale_off', orderBy === 'ASC' ? 'ASC' : 'DESC')

        const result = await qb.offset(pageSize* (page-1)).limit(pageSize).execute();
        await Promise.all(result.map(async (e: any) => {
            const supply = await this.supplyRepository.createQueryBuilder('supply')
                .where('supply.id = :id', {id: e.supplyId})
                .getOne()
            const itemReceipts = await this.importItemReceiptRepository.createQueryBuilder('iir')
                .leftJoin(Item, 'item', 'item.id = iir.item_id')
                .select([
                    'iir.quantity as quantity',
                    'iir.price as itemReceiptPrice',
                    'item.*'
                ])
                .where('iir.import_receipt_id = :receiptId', {receiptId: e.id})
                .execute()
            e.items = itemReceipts
            e.supply = supply
        }))
        const totalItemResult = (await paginationQb.execute());
        const totalItem = parseInt(totalItemResult[0].totalItem);
        const totalPage = Math.ceil(totalItem/pageSize);
        const currentPage = Number(page);
        const pageSizeNumber = Number(pageSize)
        return {
            result: result,
            pagination: {
                totalItem: totalItem,
                totalPage: totalPage,
                currentPage: currentPage,
                pageSize: pageSizeNumber,
                currentPageSize: (currentPage < totalPage)? pageSizeNumber: (currentPage === totalPage) ? (totalItem - (totalPage - 1) * pageSizeNumber) : 0
            }
        }
    }

    async getDetail(id: number) {
        let receipt = await this.importReceiptRepository.createQueryBuilder('ir')
            .where({id: id})
            .getOne()

        const items = await this.importItemReceiptRepository.find({importReceiptId: id})
        const newItems : any[] = [];
        await Promise.all(items.map(async (e: any) => {
            const item = await this.itemRepository.findOne({id: e.itemId})
            newItems.push({...e, name: item.name})
        }))
        const supply = await this.supplyRepository.findOne({id: receipt.supplyId})
        return {
            ... receipt, items: newItems, supply
        }
    }

    async create(importReceipt: CreateImportReceiptDto, importItems: CreateImportItemReceiptDto[]) {
        let totalReceiptPrice = 0;
        const receiptItems: ImportItemReceipt[] = [];

        const newReceipt = this.importReceiptRepository.create({...importReceipt})
        const newReceiptRow = await this.importReceiptRepository.save(newReceipt)
        await Promise.all(importItems.map(async (importItem: CreateImportItemReceiptDto) => {
            const item = await this.itemRepository.findOne({id: importItem.itemId})
            if (item) {
                const newItemReceipt  = this.importItemReceiptRepository.create({...importItem, price: importItem.quantity * item.price, importReceiptId: newReceiptRow.id})
                await this.importItemReceiptRepository.save(newItemReceipt);
                totalReceiptPrice += importItem.quantity * item.price;
                receiptItems.push(newItemReceipt)
            }
        }))

        newReceiptRow.totalPrice = totalReceiptPrice;
        newReceiptRow.finalPrice = totalReceiptPrice* (100- importReceipt.saleOff)/100;

        // update warehouse

        await Promise.all(receiptItems.map(async (importItem: ImportItemReceipt) => {
            let warehouse = await this.warehouseRepository.findOne({itemId: importItem.itemId})
            if (warehouse) {
                warehouse.totalQuantity += importItem.quantity;
            }
            else {
                warehouse = this.warehouseRepository.create({
                    itemId: importItem.itemId,
                    totalQuantity: importItem.quantity,
                    soleQuantity: 0,
                    remainQuantity: importItem.quantity
                })
            }
            await this.warehouseRepository.save(warehouse)
        }))

        return {
            receipt: await this.importReceiptRepository.save(newReceiptRow),
            receiptItems: receiptItems
        }
    }

    async update(id: number, totalImportReceipt: UpdateTotalImportReceiptDto) {
        const {receipt, receiptItems} = totalImportReceipt;

        await this.importReceiptRepository.createQueryBuilder('import')
            .update(ImportReceipt)
            .set(receipt)
            .where({id: id})
            .execute()

        await Promise.all(receiptItems.map(async (e: any) => {

        }))

        return 0;

    }

    async getAllHomeData(findHomeData: FindHomeDataDto) {
        const {startedAt, finishedAt} = findHomeData;

        // Count the import receipt
        const importReceipt = await this.importReceiptRepository.createQueryBuilder('import')
            .where('import.created_at >= :startedAt and import.created_at <= :finishedAt', {startedAt: startedAt, finishedAt: finishedAt})
            .getMany();

        let importValue = 0; importReceipt.map((e: any) => {importValue += e.finalPrice})
        let itemImportCount = [];
        let itemImportQuantity = 0;

        const newImportReceipt : any[] =[];
        for (let e of importReceipt) {
            const importItemReceipt = await this.importItemReceiptRepository.find({
                importReceiptId: e.id,
            })
            importItemReceipt.map((importItem: any) => {
                if (itemImportCount.find((c: any) => c.itemId === importItem.itemId)) {
                    itemImportCount.map((x: any) => {
                        if (x.itemId === importItem.itemId) x.quantity += importItem.quantity
                    })
                }
                else itemImportCount.push({
                    itemId: importItem.itemId,
                    quantity: importItem.quantity
                });
                itemImportQuantity += importItem.quantity
            })

            const supply = await this.supplyRepository.findOne({id: e.supplyId})
            newImportReceipt.push({...e, supply: supply})
        }

        await Promise.all(itemImportCount.map(async (e: any) => {
            e.item = await this.itemRepository.findOne({id: e.itemId})
            e.item.supply = await this.supplyRepository.findOne({id: e.item.supplyId})
        }))
        const importReceiptCountResult = {
            receipts: newImportReceipt,
            countReceipt : importReceipt.length,
            value: importValue,
            itemImportQuantity,
            itemImportCount: itemImportCount.sort((a,b ) => {if (a.quantity > b.quantity) {return -1} else return 1}),
            itemsMaxCount: itemImportCount.sort((a,b ) => {if (a.quantity > b.quantity) {return -1} else return 1}).slice(0,5),
            itemsMaxValue: itemImportCount.sort((a,b ) => {if (a.quantity * a.item.price > b.quantity * b.item.price) {return -1} else return 1}).slice(0,5),
        }

        return {
            importReceiptCountResult
        }
    }
}