import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Item, Manager, Staff, Supply, User, Warehouse} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {NewUserDto} from "../manager/dto/newUser.dto";
import {NewCustomerDto} from "./dto/newCustomer.dto";
import * as bcrypt from 'bcrypt';
import {UpdateDto} from "./dto/update.dto";
import {CustomerCart} from "../../database/entities/CustomerCart.entity";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,

        @InjectRepository(CustomerCart)
        private customerCartRepository: Repository<CustomerCart>,

        @InjectRepository(Item)
        private itemRepository: Repository<Item>,

        @InjectRepository(Warehouse)
        private warehouseRepository: Repository<Warehouse>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,

        @InjectRepository(Manager)
        private managerRepository: Repository<Manager>,
    ) {}

    async getList(page = 1, pageSize = 10, registerStaffId : number, registerType = '',  level = '', minScore = 0, maxScore = 100000,
                  status = 'ACTIVE',searchString = '', orderField = 'id', orderBy = 'ASC' ) {
        if (!page) page = 1;
        if (!pageSize) pageSize = 10;
        let result = this.userRepository.createQueryBuilder('user')
            .leftJoin(Customer, 'customer', 'customer.user_id = user.id')
            .select([
                'user.id as id',
                'user.full_name as name',
                'user.email as email',
                'user.nationality as nationality',
                'user.phone as phone',
                'user.avatar_image as avatarImage',
                'user.birthday as birthday',
                'user.first_name as firstName',
                'user.last_name as lastName',
                'user.status as status',
                'user.created_at as createdAt',
                'user.updated_at as updatedAt',
                'customer.register_type as registerType',
                'customer.register_staff_id as registerStaffId',
                'customer.level as level',
                'customer.score as score',
                'user.bankName as bankName',
                'user.bankAccount as bankAccount',
                'user.bankOwner as bankOwner',
                'user.address as address',
            ])
            .where(new Brackets(qb => {
                qb.where('user.full_name like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('user.nationality like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('user.email like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('user.phone like :searchString', {searchString: `%${searchString}%`})
            }))
            .andWhere('user.role_id = 6')

        let paginationResult = this.userRepository.createQueryBuilder('user')
            .leftJoin(Customer, 'customer', 'customer.user_id = user.id')
            .select('count(user.id) as totalItem')
            .where(new Brackets(qb => {
                qb.where('user.full_name like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('user.nationality like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('user.email like :searchString', {searchString: `%${searchString}%`})
                    .orWhere('user.phone like :searchString', {searchString: `%${searchString}%`})
            }))
            .andWhere('user.role_id = 6')

        if (registerStaffId)  {
            result = result.andWhere('customer.register_staff_id = :registerStaffId', {registerStaffId: registerStaffId});
            paginationResult = paginationResult.andWhere('customer.register_staff_id = :registerStaffId', {registerStaffId: registerStaffId});
        }
        if (minScore || minScore === 0) {
            result = result.andWhere('customer.score >= :minScore', {minScore: minScore})
            paginationResult = paginationResult.andWhere('customer.score >= :minScore', {minScore: minScore})
        }

        if (maxScore) {
            result = result.andWhere('customer.score <= :maxScore', {maxScore: maxScore})
            paginationResult = paginationResult.andWhere('customer.score <= :maxScore', {maxScore: maxScore})
        }

        if (registerType && registerType !== '') {
            result = result.andWhere('customer.register_type = :registerType', {registerType: registerType})
            paginationResult = paginationResult.andWhere('customer.register_type = :registerType', {registerType: registerType})
        }

        if (orderField === 'name') result = result.orderBy('user.full_name', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'lastName') result = result.orderBy('user.last_name', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'score') result = result.orderBy('customer.score', orderBy === 'ASC' ? 'ASC' : 'DESC')
        else if (orderField === 'level') result = result.orderBy('customer.level', orderBy === 'ASC' ? 'ASC' : 'DESC')

        if (status && status !== '') {
            result= result.andWhere('user.status = :status', {status: status})
            paginationResult= paginationResult.andWhere('user.status = :status', {status: status})
        }
        const data = await result
            .offset(pageSize*(page-1))
            .limit(pageSize)
            .execute()

        await Promise.all(data.map( async (e: any) => {
            if (e.registerType === 'STAFF' || e.registerType === 'MANAGER') {
                const staff = await this.userRepository.findOne({where: {id: e.registerStaffId}})
                e.staff = staff;
            }}
        ))
        const totalItemData = await paginationResult
            .execute()

        const totalItem = parseInt(totalItemData[0].totalItem);
        const totalPage = Math.ceil(totalItem/pageSize);
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
        const user = await this.userRepository.createQueryBuilder('user')
            .select([
                'user.id as id',
                'user.full_name as name',
                'user.email as email',
                'user.nationality as nationality',
                'user.phone as phone',
                'user.avatar_image as avatarImage',
                'user.birthday as birthday',
                'user.first_name as firstName',
                'user.last_name as lastName',
                'user.status as status',
                'user.bank_name as bankName',
                'user.bank_account as bankAccount',
                'user.bank_owner as bankOwner',
                'user.address as address'
            ])
            .where('user.id = :id', {id: id})
            .execute()
        const customer = await this.customerRepository.createQueryBuilder('customer')
            .where('customer.user_id = :id', {id: id})
            .getOne()
        return {
            ... user[0],
            customer: customer
        }
    }

    async create(newUser: NewUserDto, newCustomer: NewCustomerDto) {
        if (newUser.roleId !== 6 && newUser.roleId !== 7) return new HttpException(
            ["Invalid Role!"],
            HttpStatus.BAD_REQUEST,
        );
        if (newCustomer.registerType === 'STAFF') {
            const staff = await this.staffRepository.findOne({
                where: {userId: newCustomer.registerStaffId}
            })
            if (!staff) throw new HttpException(
                ["Staff not found!"],
                HttpStatus.BAD_REQUEST,
            );
        }
        if (newCustomer.registerType === 'MANAGER') {
            const staff = await this.managerRepository.findOne({
                where: {userId: newCustomer.registerStaffId}
            })
            if (!staff) throw new HttpException(
                ["Manager not found!"],
                HttpStatus.BAD_REQUEST,
            );
        }

        const oldUser = await this.userRepository.createQueryBuilder('user')
            .where('user.username = :username', {username: newUser.username})
            .orWhere('user.email = :email', {email: newUser.email})
            .orWhere('user.phone = :phone', {phone: newUser.phone})
            .execute()
        if (oldUser.length) throw new HttpException(
            ["User have email or phone or username is existed!"],
            HttpStatus.BAD_REQUEST,
        );
        const userDto = this.userRepository.create({...newUser, fullName: newUser.firstName + ' ' + newUser.lastName});
        const saltOrRounds = 10;
        userDto.passwordHash =  await bcrypt.hash(
            newUser.password,
            saltOrRounds,
        );

        try {
            const user = await this.userRepository.save(userDto);
            const customerDto = this.customerRepository.create({
                registerType: newCustomer.registerType,
                registerStaffId: newCustomer.registerStaffId,
                level: 'NEW',
                score: 0,
                userId: user.id
            })
            const customer =  await this.customerRepository.save(customerDto)
            return {
                user: user,
                customer: customer
            }
        }
        catch (error: any) {
            return new HttpException(
                [error.message],
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(id: number, body: UpdateDto) {
        const {updateCustomer, updateUser} = body
        const userUpdate =  await this.userRepository.createQueryBuilder()
            .update(User)
            .set({...updateUser, fullName: updateUser.firstName + " " + updateUser.lastName})
            .where({id: id})
            .execute()
        const customerUpdate = await this.customerRepository.createQueryBuilder()
            .update(Customer)
            .set(updateCustomer)
            .where({userId: id})
            .execute()
        return {
            userUpdate,
            customerUpdate
        }
    }

    async delete(id: number) {
        return await this.userRepository.createQueryBuilder()
            .update(User)
            .set({status: 'DELETED'})
            .where({id: id})
            .execute()
    }

    async restore(id: number) {
        return await this.userRepository.createQueryBuilder()
            .update(Supply)
            .set({status: 'ACTIVE'})
            .where({id: id, status: 'DELETED'})
            .execute()
    }

    async getCustomerCart(id: number) {
        const carts = await this.customerCartRepository.createQueryBuilder('customer_cart')
            .where('customer_cart.customer_id = :id', {id: id})
            .getMany()

        let result = {
            userId: id,
            carts: []
        }
        await Promise.all(carts.map(async (e: any) => {
            const item = await this.itemRepository.findOne({id: e.itemId})
            const warehouse = await this.warehouseRepository.findOne({itemId: e.itemId})
            result.carts.push({itemId:e.itemId, quantity: e.quantity, item: item, cartId: e.id, remainQuantity: warehouse?.remainQuantity || 0})
        }))

        return result
    }

    async addItemToCart(id: number, itemId: number) {
        const item = await this.itemRepository.findOne({id: itemId})
        if (!item) return new HttpException(
            ['Item not found!'],
            HttpStatus.BAD_REQUEST
        )

        const cart = await this.customerCartRepository.findOne({userId: id, itemId: itemId})
        if (cart) return new HttpException(
            ['Cart existed!'],
            HttpStatus.BAD_REQUEST
        )

        const newCart = this.customerCartRepository.create({userId: id, itemId: itemId})
        return await this.customerCartRepository.save(newCart)
    }

    async deleteCart(id: number) {
        return await this.customerRepository.createQueryBuilder('cart')
            .delete()
            .from(CustomerCart)
            .where({id: id})
            .execute()
    }


}