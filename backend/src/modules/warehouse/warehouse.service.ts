import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, DeviceType, Item, Manager, Staff, User, Warehouse} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindWarehouseDto} from "./dto/findWarehouse.dto";

@Injectable()
export class WarehouseService {
    constructor(
        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,

        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(DeviceType)
        private deviceTypeRepository: Repository<DeviceType>,
    ) {}

    async getList(findDto: FindWarehouseDto) {
        const pageSize = Number(findDto.pageSize) || 10;
        const page = Number(findDto.page) || 1;
        const orderField =  findDto.orderField || 'id';
        const orderBy = findDto.orderBy || 'ASC';
        const searchString = findDto.searchString || '';
        const itemId = findDto.itemId || 0;
        const deviceTypeId = findDto.deviceTypeId || 0;
        const branch = findDto.branch || '';

       let qb = await this.warehouseRepository.createQueryBuilder('warehouse')
           .innerJoin(Item, 'item', 'item.id = warehouse.item_id')
           .select([
               'warehouse.total_quantity as totalQuantity',
               'warehouse.sole_quantity as soleQuantity',
               'warehouse.remain_quantity as remainQuantity',
               'warehouse.updated_at as updatedAt',
               'item.id as itemId',
               'item.type as type',
               'item.price as price',
               'item.production_time as productionTime',
               'item.production_code as code',
               'item.status as itemStatus',
               'item.branch as branch'
           ])
           .where(new Brackets(qb => {
               qb.where('item.name like :searchString', {searchString: `%${searchString}%`})
                   .orWhere('item.type like :searchString', {searchString: `%${searchString}%`})
                   .orWhere('item.production_code like :searchString', {searchString: `%${searchString}%`})
                   .orWhere('item.status like :searchString', {searchString: `%${searchString}%`})
           }))

        if (itemId) qb = qb.andWhere('item.id = :id', {id: itemId});
        if (deviceTypeId) {
            const deviceTypes = await this.deviceTypeRepository.createQueryBuilder('device')
                .where('device.id = :id', {id: deviceTypeId})
                .orWhere('device.parent_id = :id', {id: deviceTypeId})
                .select('device.id as id')
                .execute()
            const ids = deviceTypes.map(e => e.id)
            qb = qb.andWhere('item.device_type_id IN (:...ids)', {ids: ids})
        }
        if (branch) {
            qb = qb.andWhere('item.branch = :branch', {branch: `%${branch}%`})
        }

        if (orderField == 'total') qb =qb.orderBy('warehouse.total_quantity', (orderBy == 'ASC') ? 'ASC': 'DESC')
        else if (orderField == 'sole') qb =qb.orderBy('warehouse.sole_quantity', (orderBy == 'ASC') ? 'ASC': 'DESC')
        else if (orderField == 'remain') qb =qb.orderBy('warehouse.remain_quantity', (orderBy == 'ASC') ? 'ASC': 'DESC')
        else if (orderField == 'updatedAt') qb =qb.orderBy('warehouse.updated_at', (orderBy == 'ASC') ? 'ASC': 'DESC')
        else qb =qb.orderBy('warehouse.updated_at', 'DESC')

        const warehouses = await qb.offset((page-1) * pageSize)
            .limit(pageSize)
            .execute()

        let total = await qb.select(['count(warehouse.id) as total']).execute()
        const totalItem = Number(total[0].total);
        const totalPage = Math.ceil(totalItem/pageSize);

        return {
            result: warehouses,
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
        const result = await this.warehouseRepository.createQueryBuilder('warehouse')
            .innerJoin(Item, 'item', 'item.id = warehouse.item_id')
            .select([
                'warehouse.total_quantity as totalQuantity',
                'warehouse.sole_quantity as soleQuantity',
                'warehouse.remain_quantity as remainQuantity',
                'warehouse.updated_at as updatedAt',
                'item.id as itemId',
                'item.type as type',
                'item.price as price',
                'item.production_time as productionTime',
                'item.production_code as code',
                'item.status as itemStatus'
            ])
            .where('warehouse.id = :id', {id: id})
            .execute()

        return result[0]
    }

}