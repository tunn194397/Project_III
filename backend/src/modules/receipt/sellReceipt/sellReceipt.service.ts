import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {
    Customer,
    Item, Manager, SellItemReceipt, SellReceipt, Staff, User, Voucher, Warehouse,
} from "../../../database/entities";
import {Repository} from "typeorm";
import {FindReceiptDto} from "./dto/findReceipt.dto";
import {CreateSellReceiptDto} from "./dto/createSellReceipt.dto";
import {CreateSellItemReceiptDto} from "./dto/createSellItemReceipt.dto";
import {FindHomeDataDto} from "../../item/dto/findHomeData.dto";

@Injectable()
export class SellReceiptService {
    constructor(
        @InjectRepository(SellReceipt)
        private sellReceiptRepository: Repository<SellReceipt>,

        @InjectRepository(SellItemReceipt)
        private sellItemReceiptRepository: Repository<SellItemReceipt>,

        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,

        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>,

        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,

        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,

        @InjectRepository(Manager)
        private managerRepository: Repository<Manager>,

    ) {}

    async getList(findReceiptDto: FindReceiptDto ) {
        const {page, pageSize, customerId, staffId, minPrice, maxPrice, minSaleOff, maxSaleOff, searchString, orderField, orderBy} = findReceiptDto
        console.log("LLLL", customerId, staffId)
        let qb = this.sellReceiptRepository.createQueryBuilder('sr')
            .select([
                'sr.id as id',
                'sr.customer_id as customerId',
                'sr.staff_id as staffId',
                'sr.total_price as totalPrice',
                'sr.content as content',
                'sr.note as note',
                'sr.sale_off as saleOff',
                'sr.final_price as finalPrice',
                'sr.updated_at as updatedAt'
            ])
            .where('sr.final_price >= :minPrice and sr.final_price <= :maxPrice', {minPrice: minPrice, maxPrice: maxPrice})
            .andWhere('sr.sale_off >= :minSaleOff and sr.sale_off <= :maxSaleOff', {minSaleOff: minSaleOff, maxSaleOff: maxSaleOff})
            .andWhere('sr.content like :searchString', {searchString: `%${searchString}%`})
            .andWhere('sr.note like :searchString', {searchString: `%${searchString}%`})

        let paginationQb = this.sellReceiptRepository.createQueryBuilder('sr')
            .select([
                'count(sr.id) as totalItem'
            ])
            .where('sr.final_price >= :minPrice and sr.final_price <= :maxPrice', {minPrice: minPrice, maxPrice: maxPrice})
            .andWhere('sr.sale_off >= :minSaleOff and sr.sale_off <= :maxSaleOff', {minSaleOff: minSaleOff, maxSaleOff: maxSaleOff})
            .andWhere('sr.content like :searchString', {searchString: `%${searchString}%`})
            .andWhere('sr.note like :searchString', {searchString: `%${searchString}%`})


        if (orderField === 'finalPrice') qb = qb.orderBy('sr.final_price', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'saleOff') qb = qb.orderBy('sr.sale_off', orderBy === 'ASC' ? 'ASC' : 'DESC')

        if (customerId && Number(customerId) !== 0) {
            qb = qb.andWhere('sr.customer_id = :customerId', {customerId: customerId})
            paginationQb = paginationQb.andWhere('sr.customer_id = :customerId', {customerId: customerId})
        }
        if (staffId && Number(staffId) !== 0) {
            qb = qb.andWhere('sr.staff_id = :staffId', {staffId: staffId})
            paginationQb = paginationQb.andWhere('sr.staff_id = :staffId', {staffId: staffId})
        }

        const result = await qb.offset(pageSize* (page-1)).limit(pageSize).execute();
        await Promise.all(result.map(async (e: any) => {
            const customer = await this.userRepository.createQueryBuilder('user')
                .innerJoinAndSelect(Customer, 'customer', 'customer.user_id = user.id')
                .where('user.id = :id',{id: e.customerId})
                .getOne()
            const staff = await this.userRepository.createQueryBuilder('user')
                .innerJoinAndSelect(Staff, 'staff', 'staff.user_id = user.id')
                .where('user.id = :id',{id: e.staffId})
                .getOne()
            const manager = await this.userRepository.createQueryBuilder('user')
                .innerJoinAndSelect(Manager, 'manager', 'manager.user_id = user.id')
                .where('user.id = :id',{id: e.staffId})
                .getOne()
            const itemReceipts = await this.sellItemReceiptRepository.createQueryBuilder('sir')
                .leftJoin(Item, 'item', 'item.id = sir.item_id')
                .select([
                    'sir.quantity as quantity',
                    'sir.price as itemReceiptPrice',
                    'item.*'
                ])
                .where('sir.sell_receipt_id = :receiptId', {receiptId: e.id})
                .execute()
            e.items = itemReceipts
            e.customer = customer
            e.staff = staff
            e.manager = manager
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
        let receipt = await this.sellReceiptRepository.createQueryBuilder('ir')
            .where({id: id})
            .getOne()

        const items = await this.sellItemReceiptRepository.find({sellReceiptId: id})
        const newItems : any[] = [];
        await Promise.all(items.map(async (e: any) => {
            const item = await this.itemRepository.findOne({id: e.itemId})
            newItems.push({...e, name: item.name})
        }))

        const staff = await this.userRepository.findOne({id: receipt.staffId})
        const customer = await this.userRepository.findOne({id: receipt.customerId})

        return {
            ... receipt, items: newItems, staff, customer
        }
    }

    async create(sellReceipt: CreateSellReceiptDto, sellItems: CreateSellItemReceiptDto[]) {
        const customer = await this.userRepository.findOne({id: sellReceipt.customerId})
        if (!customer || customer.roleId !== 6) return new HttpException(
            ['Customer not found!'],
            HttpStatus.BAD_REQUEST
        )

        const staff = await this.userRepository.findOne({id: sellReceipt.staffId})
        if (!staff ) return new HttpException(
            ['Staff not found!'],
            HttpStatus.BAD_REQUEST
        )

        let totalReceiptPrice = 0;
        const receiptItems: any[] = [];

        const newReceipt = this.sellReceiptRepository.create({...sellReceipt})
        const newReceiptRow = await this.sellReceiptRepository.save(newReceipt)

        // check if validate warehouse for this sell receipt
        const validate : any[] = [];
        await Promise.all(sellItems.map(async (sellItem: CreateSellItemReceiptDto) => {
            let warehouse = await this.warehouseRepository.findOne({itemId: sellItem.itemId})
            if (!warehouse ||  warehouse.remainQuantity < sellItem.quantity) validate.push(1);
        }))
        if (validate.includes(1)) return new HttpException(
            ['Warehouse is not enough for the items in this receipt'],
            HttpStatus.BAD_REQUEST
        )

        await Promise.all(sellItems.map(async (sellItem: CreateSellItemReceiptDto) => {
            let warehouse = await this.warehouseRepository.findOne({itemId: sellItem.itemId})
            if (warehouse && warehouse.remainQuantity >= sellItem.quantity) {
                warehouse.soleQuantity += sellItem.quantity;
                warehouse.remainQuantity -= sellItem.quantity;
                await this.warehouseRepository.save(warehouse)
                const item = await this.itemRepository.findOne({id: sellItem.itemId})
                if (item) {
                    const newItemReceipt  = this.sellItemReceiptRepository.create({...sellItem, price: sellItem.quantity * item.price, sellReceiptId: newReceiptRow.id})
                    await this.sellItemReceiptRepository.save(newItemReceipt);
                    totalReceiptPrice += sellItem.quantity * item.price;
                    receiptItems.push(newItemReceipt)
                }
            }
        }))

        newReceiptRow.totalPrice = totalReceiptPrice;
        const voucher = await this.voucherRepository.findOne({id: sellReceipt.voucherId})
        const saleOff = voucher.offValue || 0;
        newReceiptRow.saleOff = saleOff;
        newReceiptRow.finalPrice = totalReceiptPrice* (100- saleOff)/100;

        return {
            receipt: await this.sellReceiptRepository.save(newReceiptRow),
            receiptItems: receiptItems
        }
    }

    async getAllHomeData(findHomeData: FindHomeDataDto) {
        const {startedAt, finishedAt} = findHomeData;

        // Count the import receipt
        const sellReceipt = await this.sellReceiptRepository.createQueryBuilder('sell')
            .where('sell.created_at >= :startedAt and sell.created_at <= :finishedAt', {startedAt: startedAt, finishedAt: finishedAt})
            .getMany();

        let sellValue = 0; sellReceipt.map((e: any) => {sellValue += e.finalPrice})
        let itemSellCount = [];
        let itemSellQuantity = 0;

        const newSellReceipt : any[] =[];
        for (let e of sellReceipt) {
            const sellItemReceipt = await this.sellItemReceiptRepository.find({
                sellReceiptId: e.id,
            })
            sellItemReceipt.map((sellItem: any) => {
                if (itemSellCount.find((c: any) => c.itemId === sellItem.itemId)) {
                    itemSellCount.map((x: any) => {
                        if (x.itemId === sellItem.itemId) x.quantity += sellItem.quantity
                    })
                }
                else itemSellCount.push({
                    itemId: sellItem.itemId,
                    quantity: sellItem.quantity
                });
                itemSellQuantity += sellItem.quantity
            })

            const staff = await this.userRepository.findOne({id: e.staffId})
            const customer = await this.userRepository.findOne({id: e.customerId})

            newSellReceipt.push({...e, staff: staff, customer: customer})
        }

        await Promise.all(itemSellCount.map(async (e: any) => {
            e.item = await this.itemRepository.findOne({id: e.itemId})
        }))
        const sellReceiptCountResult = {
            receipts: newSellReceipt,
            countReceipt : sellReceipt.length,
            value: sellValue,
            itemSellQuantity,
            itemSellCount: itemSellCount.sort((a,b ) => {if (a.quantity > b.quantity) {return -1} else return 1}),
            itemsMaxCount: itemSellCount.sort((a,b ) => {if (a.quantity > b.quantity) {return -1} else return 1}).slice(0,5),
            itemsMaxValue: itemSellCount.sort((a,b ) => {if (a.quantity * a.item.price > b.quantity * b.item.price) {return -1} else return 1}).slice(0,5),
        }

        return {
            sellReceiptCountResult
        }
    }
}