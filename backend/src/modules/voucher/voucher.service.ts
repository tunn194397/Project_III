import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Manager, Staff, User, Warehouse, Voucher, Item, DeviceType} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {NewVoucherDto} from "./dto/NewVoucher.dto";
import {UpdateVoucherDto} from "./dto/UpdateVoucher.dto";
import {FindVoucherDto} from "./dto/FindVoucher.dto";
import {Causes} from "../../config/exception/causes";

@Injectable()
export class VoucherService {
    constructor(
        @InjectRepository(Voucher)
        private voucherRepository: Repository<Voucher>,

        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(DeviceType)
        private deviceTypeRepository: Repository<DeviceType>
    ) {}

    async getList(findVoucherDto: FindVoucherDto) {
        const pageSize = Number(findVoucherDto.pageSize) || 10;
        const page = Number(findVoucherDto.page) || 1;
        const orderField =  findVoucherDto.orderField || 'id';
        const orderBy = findVoucherDto.orderBy || 'ASC';
        const searchString = findVoucherDto.searchString || '';
        const minOff = Number(findVoucherDto.minOff) || 0;
        const maxOff = Number(findVoucherDto.maxOff) || 100;
        const startedAt = Number(findVoucherDto.startedAt) || 0;
        const finishedAt = Number(findVoucherDto.finishedAt) || 10000000000000000;
        const deviceBranch = findVoucherDto.deviceBranch || '';
        const deviceType = findVoucherDto.deviceType || '';
        const status = findVoucherDto.status || ''


        let qb = this.voucherRepository.createQueryBuilder('voucher')
            .select([
                'voucher.id as id',
                'voucher.content as content',
                'voucher.device_type_ids as deviceType',
                'voucher.device_branches as deviceBranch',
                'voucher.started_at as startedAt',
                'voucher.finished_at as finishedAt',
                'voucher.status as status',
                'voucher.off_string as offString',
                'voucher.created_at as createdAt',
                'voucher.updated_at as updatedAt'
            ])
            .where('voucher.device_type_ids like :deviceType', {deviceType: `%${deviceType}%`})
            .andWhere('voucher.device_branches like :deviceBranch', {deviceBranch: `%${deviceBranch}%`})
            .andWhere('voucher.status like :status', {status: `%${status}%`})
            .andWhere('voucher.off_value > :minOff', {minOff: minOff})
            .andWhere('voucher.off_value < :maxOff', {maxOff: maxOff})
            .andWhere('voucher.content like :searchString', {searchString: `%${searchString}%`})

        let paginationQb = this.voucherRepository.createQueryBuilder('voucher')
            .select([
                'count(voucher.id) as totalItem'
            ])
            .where('voucher.device_type_ids like :deviceType', {deviceType: `%${deviceType}%`})
            .andWhere('voucher.device_branches like :deviceBranch', {deviceBranch: `%${deviceBranch}%`})
            .andWhere('voucher.status like :status', {status: `%${status}%`})
            .andWhere('voucher.off_value > :minOff', {minOff: minOff})
            .andWhere('voucher.off_value < :maxOff', {maxOff: maxOff})
            .andWhere('voucher.content like :searchString', {searchString: `%${searchString}%`})

        if (startedAt) {
            qb = qb.andWhere('voucher.started_at > :startedAt', {startedAt: startedAt});
            paginationQb = paginationQb.andWhere('voucher.started_at > :startedAt', {startedAt: startedAt})
        }
        if (finishedAt) {
            qb = qb.andWhere('voucher.finished_at < :finishedAt', {finishedAt: finishedAt});
            paginationQb = paginationQb.andWhere('voucher.finished_at < :finishedAt', {finishedAt: finishedAt})
        }

        if (orderField === 'content') qb = qb.orderBy('voucher.content', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'startedAt') qb = qb.orderBy('voucher.started_at', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'finishedAt') qb = qb.orderBy('voucher.finished_at', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'offValue') qb = qb.orderBy('voucher.off_value', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else qb = qb.orderBy('voucher.id', orderBy === 'ASC' ? 'ASC' : 'DESC')

        const result = await qb.offset(pageSize* (page-1)).limit(pageSize).execute()
        await Promise.all(result.map( async (e: any) => {
            const deviceTypeIds = e.deviceType.split(",")
            const deviceTypeArray = [];
            await Promise.all(deviceTypeIds.map( async (id : any) => {
                const deviceType = await this.deviceTypeRepository.findOne({id: Number(id)});
                deviceTypeArray.push(deviceType?.name)
            }))

            e.deviceType = deviceTypeArray.join(",")
        }))
        const totalItemResult = (await paginationQb.execute());

        const totalItem = parseInt(totalItemResult[0].totalItem);
        const totalPage = Math.ceil(totalItem/pageSize)
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
        const result =  await this.voucherRepository.findOne({id: id});
        if (!result) throw new HttpException(
            'Voucher not found!',
            HttpStatus.BAD_REQUEST,
        );
        else return result
    }

    async create(newVoucherDto: NewVoucherDto) {
        const deviceTypeIds = (newVoucherDto.deviceTypeIds).join(",");
        const deviceBranches = (newVoucherDto.deviceBranches).join(",");
        const newVoucher = this.voucherRepository.create({
            content: newVoucherDto.content,
            deviceTypeIds: deviceTypeIds,
            deviceBranches: deviceBranches,
            startedAt: newVoucherDto.startedAt,
            finishedAt: newVoucherDto.finishedAt,
            offValue: newVoucherDto.offValue,
            offString: String(newVoucherDto.offValue) + "%",
            image: newVoucherDto.image
        });
        return await this.voucherRepository.save(newVoucher);
    }

    async update(id: number, updateVoucherDto: UpdateVoucherDto) {
        return await this.voucherRepository.createQueryBuilder('voucher')
            .update(Voucher)
            .set(updateVoucherDto)
            .where({id: id})
            .execute()
    }

    // TODO
    async getVoucherWithItem(itemId: number) {
        const item = await this.itemRepository.findOne({id: itemId })
        const vouchers = await this.voucherRepository.createQueryBuilder('voucher')
            .where(new Brackets(qb => {
                qb.where('voucher.device_type_ids = :id', {id: `%${String(item.deviceTypeId)}%`})
                .orWhere('voucher.device_branch = :branch', {branch: `%${item.branch}%`})
            }))
            .andWhere('voucher.started_at >= :now', {now: (new Date()).getTime()})
            .getMany()

        return vouchers;

    }
}