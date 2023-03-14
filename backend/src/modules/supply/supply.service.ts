import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Manager, Staff, Supply, User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {NewSupplyDto} from "./dto/CreateSupply.dto";
import {UpdateSupplyDto} from "./dto/UpdateSupply.dto";

@Injectable()
export class SupplyService {
    constructor(
        @InjectRepository(Supply)
        private supplyRepository: Repository<Supply>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getList(page = 1, pageSize = 10, startDate = 0, endDate = 0, status = 'ACTIVE',searchString = '', orderField = 'id', orderBy = 'ASC' ) {
        if (!page) page = 1;
        if (!pageSize) pageSize = 10;
        let result = this.supplyRepository.createQueryBuilder('supply')
            .select([
                'supply.id as id',
                'supply.name as name',
                'supply.address as address',
                'supply.email as email',
                'supply.phone as phone',
                'supply.image_url as imageUrl',
                'supply.representative_id as representativeId',
                'supply.representative_name as representativeName',
                'supply.status as status',
                'supply.created_at as createdAt',
                'supply.updated_at as updatedAt',
            ])
            .where(new Brackets(qb => {
                qb.where('supply.name like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.address like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.email like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.phone like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.representative_name like :searchString', {searchString: `%${searchString}%`})
            }));

        let paginationResult = this.supplyRepository.createQueryBuilder('supply')
            .select('count(supply.id) as totalItem')
            .where(new Brackets(qb => {
                qb.where('supply.name like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.address like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.email like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.phone like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('supply.representative_name like :searchString', {searchString: `%${searchString}%`})
            }));

        if (startDate)  {
            result = result.andWhere('supply.created_at >= :startDate', {startDate: startDate});
            paginationResult = paginationResult.andWhere('supply.created_at >= :startDate', {startDate: startDate});
        }
        if (endDate) {
            result = result.andWhere('supply.created_at <= :endDate', {endDate: Number(endDate)})
            paginationResult = paginationResult.andWhere('supply.created_at <= :endDate', {endDate: Number(endDate)})
        }

        if (orderField === 'name') result = result.orderBy('supply.name', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'representativeName') result = result.orderBy('supply.representative_name', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'createdAt') result = result.orderBy('supply.created_at', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else result = result.orderBy('supply.id', orderBy === 'ASC' ? 'ASC' : 'DESC')

        if (status !== '') {
            result = result.andWhere('supply.status = :status', {status: status})
            paginationResult = paginationResult.andWhere('supply.status = :status', {status: status})
        }
        const data = await result
            .offset(pageSize*(page-1))
            .limit(pageSize)
            .execute()
        const totalItemData = await paginationResult.andWhere('supply.status =:status', {status: status})
            .execute()

        await Promise.all(data.map(async (e: any) => {
            const representative = await this.userRepository.findOne({id: e.representativeId})
            e.representativeName = representative?.fullName
        }))

        const totalItem = parseInt(totalItemData[0].totalItem);
        const totalPage = Math.ceil(totalItem/pageSize)
        return {
            result: data,
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
        return await this.supplyRepository.createQueryBuilder('supply')
            .where('supply.id = :id', {id: id})
            .getOne()
    }

    async create(newSupplyDto: NewSupplyDto) {
        const user = await this.userRepository.findOne({id: newSupplyDto.representativeId});
        if (!user) return null;
        newSupplyDto.representativeName = user?.fullName || '';

        const newSupply = this.supplyRepository.create(newSupplyDto);
        return await this.supplyRepository.save(newSupply)
    }

    async update(id: number, updateSupplyDto: UpdateSupplyDto) {
        return await this.supplyRepository.createQueryBuilder()
            .update(Supply)
            .set(updateSupplyDto)
            .where({id: id})
            .execute()
    }

    async delete(id: number) {
        return await this.supplyRepository.createQueryBuilder()
            .update(Supply)
            .set({status: 'DELETED'})
            .where({id: id})
            .execute()
    }

    async restore(id: number) {
        return await this.supplyRepository.createQueryBuilder()
            .update(Supply)
            .set({status: 'ACTIVE'})
            .where({id: id, status: 'DELETED'})
            .execute()
    }
}