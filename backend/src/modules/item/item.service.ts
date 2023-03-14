import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {
    DeviceParameter,
    DeviceType, ImportReceipt,
    Item,
    ItemParameter, Report, SellReceipt, Supply, User, Voucher, Warehouse,
} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {CreateItemDto} from "./dto/createItem.dto";
import {CreateItemParameterDto} from "./dto/createItemParameter.dto";
import {FindItemDto} from "./dto/findItem.dto";
import {UpdateTotalItemDto} from "./dto/updateTotalItem.dto";
import {UpdateItemParameterDto} from "./dto/updateItemParameter.dto";
import {FindHomeDataDto} from "./dto/findHomeData.dto";
import {CreateCommentDto} from "./dto/createComment.dto";
import {UpdateCommentDto} from "./dto/updateComment.dto";
import {HttpResponse} from "aws-sdk";

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(ItemParameter)
        private itemParameterRepository: Repository<ItemParameter>,

        @InjectRepository(DeviceType)
        private deviceTypeRepository: Repository<DeviceType>,

        @InjectRepository(DeviceParameter)
        private deviceParameterRepository: Repository<DeviceParameter>,

        @InjectRepository(Supply)
        private supplyRepository: Repository<Supply>,

        @InjectRepository(SellReceipt)
        private sellReceiptRepository: Repository<SellReceipt>,

        @InjectRepository(ImportReceipt)
        private importReceiptRepository: Repository<ImportReceipt>,

        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>,

        @InjectRepository(Report)
        private reportRepository: Repository<Report>,

        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,

    ) {}

    async getList(findItemDto: FindItemDto) {
        const pageSize = Number(findItemDto.pageSize) || 10;
        const page = Number(findItemDto.page) || 1;
        const orderField =  findItemDto.orderField || 'id';
        const orderBy = findItemDto.orderBy || 'ASC';
        const searchString = findItemDto.searchString || '';
        const minPrice = Number(findItemDto.minPrice) || 0;
        const maxPrice = Number(findItemDto.maxPrice) || 1000000000;
        const deviceType = Number(findItemDto.deviceType) || 0;
        const branch = findItemDto.branch || '';
        const supplyId = findItemDto.supplyId || '0';

        let qb = this.itemRepository.createQueryBuilder('item')
            .where(new Brackets(qb => {
                qb.where('item.name like :searchString', {searchString: `%${searchString}%`})
                .orWhere('item.type like :searchString', {searchString: `%${searchString}%`})
                .orWhere('item.content like :searchString', {searchString: `%${searchString}%`})
                .orWhere('item.introduce like :searchString', {searchString: `%${searchString}%`})
            }))
            .andWhere('item.price > :minPrice', {minPrice: minPrice})
            .andWhere('item.price < :maxPrice', {maxPrice: maxPrice})

        let paginationQb = this.itemRepository.createQueryBuilder('item')
            .where(new Brackets(qb => {
                qb.where('item.name like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('item.content like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('item.introduce like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('item.type like :searchString', {searchString: `%${searchString}%`})
            }))
            .andWhere('item.price > :minPrice', {minPrice: minPrice})
            .andWhere('item.price < :maxPrice', {maxPrice: maxPrice})

        if (deviceType) {
            qb = qb.andWhere('item.device_type_id = :deviceType', {deviceType: deviceType})
            paginationQb = paginationQb.andWhere('item.device_type_id = :deviceType', {deviceType: deviceType})
        }
        if (branch) {
            qb = qb.andWhere('item.branch like :branch', {branch: `%${branch}%`})
            paginationQb = paginationQb.andWhere('item.branch like :branch', {branch: `%${branch}%`})
        }
        if (supplyId && supplyId !== '0') {
            qb = qb.andWhere('item.supply_id = :supplyId', {supplyId: supplyId})
            paginationQb = paginationQb.andWhere('item.supply_id = :supplyId', {supplyId: supplyId})
        }

        if (orderField === 'id') qb.orderBy('item.id', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'name') qb.orderBy('item.name', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'type') qb.orderBy('item.type', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'price') qb.orderBy('item.price', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'productionTime') qb.orderBy('item.production_time', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'productionCode') qb.orderBy('item.production_code', orderBy==='ASC' ? 'ASC': 'DESC')

        const items = await qb
            .offset((page-1) * pageSize)
            .limit(pageSize)
            .getMany();

        const result: any[] = [];
        for (let e of items) {
            const parameter = await this.itemParameterRepository.createQueryBuilder('ip')
                .leftJoinAndSelect(DeviceParameter, 'dp', 'dp.id = ip.device_parameter_id')
                .where({item: e})
                .select([
                    'ip.value as value',
                    'ip.detail as detail',
                    'dp.id as paramId',
                    'dp.param_name as paramName',
                    'dp.param_unit as paramUnit'
                ])
                .execute()
            const supply = await this.supplyRepository.findOne({id: e.supplyId})
            const warehouse = await this.warehouseRepository.findOne({itemId: e.id})
            const vouchers = await this.voucherRepository.createQueryBuilder('voucher')
                .where(new Brackets(qb => {
                    qb.where('voucher.device_type_ids like :id', {id: `%${String(e.deviceTypeId)}%`})
                        .orWhere('voucher.device_branches like :branch', {branch: `%${e.branch}%`})
                }))
                .andWhere('voucher.started_at <= :now && voucher.finished_at >= :now', {now: (new Date()).getTime()})
                .getMany()

            result.push({...e, parameter: parameter, supply: supply, warehouse: warehouse, vouchers: vouchers})
        }

        let total = await paginationQb.select(['count(item.id) as total']).execute()
        const totalItem = Number(total[0].total);
        const totalPage = Math.ceil(totalItem/pageSize);

        return {
            result: result,
            pagination : {
                totalItem: totalItem,
                totalPage: totalPage,
                currentPage: Number(page),
                pageSize: Number(pageSize),
                currentPageSize: (page >= totalPage) ? Number(totalItem - (totalPage - 1) * pageSize) : Number(pageSize)
            }
        }
    }

    async getDetail(id: number) {
        const result = await this.itemRepository.createQueryBuilder('item')
            .leftJoinAndSelect('item.parameter', 'item_parameter')
            .where({id: id})
            .getOne()

        await Promise.all(result.parameter.map(async (e: any) => {
            const deviceParameter = await this.deviceParameterRepository.findOne({id: e.deviceParameterId})
            e.deviceParameterName = deviceParameter.paramName
        }))

        const comments = await this.reportRepository.createQueryBuilder('report')
            .where('report.item_id = :id', {id: result.id})
            .orderBy('report.id', 'DESC')
            .getMany()

        const commentResult : any[] =[];

        for (const e of comments) {
            const user = await this.userRepository.createQueryBuilder('user')
                .where('user.id = :id', {id: e.reporterId})
                .getOne()
            commentResult.push({...e, reporter: user})
        }

        const vouchers = await this.voucherRepository.createQueryBuilder('voucher')
            .where('voucher.started_at <= :startedAt and voucher.finished_at >= :finishedAt', {startedAt: new Date().getTime() , finishedAt: new Date().getTime()})
            .orderBy('voucher.off_value', 'DESC')
            .getMany()
        return {...result, comments: commentResult, vouchers: vouchers};
    }

    async create(item: CreateItemDto, itemParameters: CreateItemParameterDto[]) {
        const deviceType = await this.deviceTypeRepository.findOne({id: item.deviceTypeId})
        item.type = deviceType?.name
        let newItemObj = this.itemRepository.create(item);
        const newItem = await this.itemRepository.save(newItemObj)
        await Promise.all(itemParameters.map(async (itemParameters: CreateItemParameterDto) => {
            let newItemParameterObj = this.itemParameterRepository.create({...itemParameters, item: newItem})
            await this.itemParameterRepository.save(newItemParameterObj);
        }))

        return newItem;
    }

    async update(id: number, updateTotalItemDto: UpdateTotalItemDto) {
        const itemUpdate = await this.itemRepository.update(
            {id: id},
            updateTotalItemDto.item
        )
        const item = await this.itemRepository.findOne(id);

        await Promise.all(updateTotalItemDto.itemParameters.map(async (e: UpdateItemParameterDto) => {
            const itemParam = await this.itemParameterRepository.findOne({
                where: {item: item, deviceParameterId: e.deviceParameterId}
            })
            if (itemParam) {
                await this.itemParameterRepository.update(
                    {id: itemParam.id},
                    e
                )
            } else {
                await this.itemParameterRepository.save(e)
            }

        }))

        return itemUpdate
    }

    async getAllDevice() {
        return await this.deviceTypeRepository.find()
    }

    async getAllHomeData(findHomeData: FindHomeDataDto) {
        const {startedAt, finishedAt} = findHomeData;

        // Count the sell receipt
        const sellReceipt = await this.sellReceiptRepository.createQueryBuilder('sell')
            .where('sell.created_at >= :startedAt and sell.created_at <= :finishedAt', {startedAt: startedAt, finishedAt: finishedAt})
            .getMany();

        let sellValue = 0; sellReceipt.map((e: any) => {sellValue += e.finalPrice})
        const sellReceiptCountResult = {count : sellReceipt.length, value: sellValue}

        // Count the import receipt
        const importReceipt = await this.importReceiptRepository.createQueryBuilder('import')
            .where('import.created_at >= :startedAt and import.created_at <= :finishedAt', {startedAt: startedAt, finishedAt: finishedAt})
            .getMany();

        let importValue = 0; importReceipt.map((e: any) => {importValue += e.finalPrice})
        const importReceiptCountResult = {count : importReceipt.length, value: importValue}

        // Count the item have sell much

        // All the voucher in month
        const voucher = await this.voucherRepository.createQueryBuilder('voucher')
            .where('voucher.started_at >= :startedAt and voucher.started_at <= :finishedAt', {startedAt: startedAt, finishedAt: finishedAt})
            .getMany()

        // Warehouse
        const warehouse = await this.warehouseRepository.createQueryBuilder('warehouse')
            .getMany()
        let totalItemInWarehouse = 0, totalValueOfWarehouse = 0;
        await Promise.all(warehouse.map(async (e: any) => {
            totalItemInWarehouse += e.remainQuantity;
            const item = await this.itemRepository.findOne({id: e.itemId})
            totalValueOfWarehouse += item?.price * e.remainQuantity
        }))

        return {
            sellReceiptCountResult,
            importReceiptCountResult,
            allVouchers: voucher,
            warehouse: {
                totalItemInWarehouse,
                totalValueOfWarehouse
            }
        }
    }

    async createComment(createComment: CreateCommentDto) {
        return await this.reportRepository.createQueryBuilder('report')
            .insert()
            .into(Report)
            .values([{
                ...createComment,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime()
            }])
            .execute()
    }

    async updateComment(commentId: number, id: number, updateCommentDto: UpdateCommentDto) {
        const comment = await this.reportRepository.findOne({id: commentId})
        if (!comment || comment.reporterId !== id ) throw new HttpException(
            ['Comment is not belong to this customer!'],
            HttpStatus.BAD_REQUEST
        )
        return await this.reportRepository.createQueryBuilder('report')
            .update(Report)
            .set({
                ...updateCommentDto,
                updatedAt: new Date().getTime()
            })
            .execute()
    }

    async deleteComment(commentId: number, id: number) {
        const comment = await this.reportRepository.findOne({id: commentId})
        if (!comment || comment.reporterId !== id ) throw new HttpException(
            ['Comment is not belong to this customer!'],
            HttpStatus.BAD_REQUEST
        )
        return await this.reportRepository.createQueryBuilder('report')
            .delete()
            .from(Report)
            .where({
                id: commentId
            })
            .execute()
    }


}