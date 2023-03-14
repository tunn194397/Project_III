import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Branch, Customer, Manager, Role, Staff, User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindUserDto} from "../../shared/request/findUser.dto";
import {NewManagerDto} from "./dto/newManager.dto";
import {NewUserDto} from "./dto/newUser.dto";
import * as bcrypt from 'bcrypt';
import {UpdateManagerDto} from "./dto/updateManager.dto";
import {FindDto} from "../../helper/dto/find.dto";
import {UpdateManagerDetailDto} from "./dto/updateManagerDetail.dto";

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Manager)
        private managerRepository: Repository<Manager>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Branch)
        private branchRepository: Repository<Branch>
    ) {}

    async getListManager(findUserDto: FindUserDto) {
        let qb = this.managerRepository.createQueryBuilder('manager')
            .innerJoin(User, 'user', 'user.id = manager.user_id')
            .select(
                [
                    'manager.id as managerId',
                    'manager.*',
                    'user.*'
                ]
            )

        let paginationQb = this.managerRepository.createQueryBuilder('manager')
            .innerJoin(User, 'user', 'user.id = manager.user_id')
            .select(['count(user.id) as total'])

        if (findUserDto.userId) {
            qb = qb.andWhere('user.id = :userId', {userId: findUserDto.userId});
        }
        if (findUserDto.firstName) {
            qb = qb.andWhere('user.first_name like :firstName', {firstName: `%${findUserDto.firstName}%`})
        }
        if (findUserDto.lastName) {
            qb = qb.andWhere('user.last_name like :lastName', {lastName: `%${findUserDto.lastName}%`})
        }
        if (findUserDto.phone) {
            qb = qb.andWhere('user.phone like :phone', {phone: `%${findUserDto.phone}%`})
        }
        if (findUserDto.branchId) {
            qb = qb.andWhere('manager.branch_id = :branchId', {branchId: findUserDto.branchId})
        }
        if (findUserDto.email) {
            qb = qb.andWhere('user.email like :email', {email: `%${findUserDto.email}%`})
        }
        if (findUserDto.status) {
            qb = qb.andWhere('user.status = :status', {status: findUserDto.status})
        }
        if (findUserDto.birthday) {
            qb = qb.andWhere('user.birthday = :birthday', {birthday: findUserDto.birthday})
        }
        if (findUserDto.fullName) {
            qb = qb.andWhere('user.full_name like :fullName', {fullName:`%${findUserDto.fullName}%` })
        }
        if (findUserDto.roleId) {
            qb = qb.andWhere('user.role_id in (:roleId)', {roleId: findUserDto.roleId})
        }
        return await qb.execute()
    }

    async getListManagerWithSearch(findDto: FindDto) {
        const pageSize = Number(findDto.pageSize) || 10;
        const page = Number(findDto.page) || 1;
        const orderField =  findDto.orderField || 'id';
        const orderBy = findDto.orderBy || 'ASC';
        const searchString = findDto.searchString || '';

        let qb = this.managerRepository.createQueryBuilder('manager')
            .innerJoin(User, 'user', 'user.id = manager.user_id')
            .innerJoin(Role, 'role', 'role.id = user.role_id')
            .leftJoin(Branch, 'branch', 'branch.id = manager.branch_id')
            .where('user.full_name like :searchString', {searchString: `%${searchString}%`})
            .orWhere('user.first_name like :searchString', {searchString: `%${searchString}%`})
            .orWhere('user.last_name like :searchString', {searchString: `%${searchString}%`})
            .orWhere('user.email like :searchString', {searchString: `%${searchString}%`})
            .orWhere('user.phone like :searchString', {searchString: `%${searchString}%`})

        if (orderField === 'id') qb.orderBy('user.id', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'name') qb.orderBy('user.full_name', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'branch') qb.orderBy('branch.name', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'email') qb.orderBy('user.email', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'phone') qb.orderBy('user.phone', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'role') qb.orderBy('role.role', orderBy==='ASC' ? 'ASC': 'DESC')

        if (! isNaN(Number(searchString)) ) {
            qb = qb.orWhere('user.id = :id', {id: Number(searchString)})
                .orWhere('manager.id = :id', {id: Number(searchString)})
        }

        let total = await qb.select(['count(user.id) as total']).execute()
        const totalItem = Number(total[0].total);
        const totalPage = Math.ceil(totalItem/pageSize);

        return {
            result: await qb
                .select([
                    'manager.id as managerId',
                    'manager.branch_id as branchId',
                    'manager.certificates as certificates',
                    'manager.introduce as introduce',
                    'manager.salary as salary',
                    'user.id as id',
                    'user.first_name as firstName',
                    'user.last_name as lastName',
                    'user.full_name as fullName',
                    'user.phone as phone',
                    'user.email as email',
                    'user.status as status',
                    'role.role as role',
                    'user.avatar_image as image',
                    'branch.name as branch',
                    'branch.address as branchAddress'
                ])
                .offset((page-1) * pageSize)
                .limit(pageSize)
                .execute(),
            pagination : {
                totalItem: totalItem,
                totalPage: totalPage,
                currentPage: Number(page),
                pageSize: Number(pageSize),
                currentPageSize: (page >= totalPage) ? Number(totalItem - (totalPage - 1) * pageSize) : Number(pageSize)
            }
        }
    }

    async getManagerDetail(id: number) {
        let manager = await this.managerRepository.findOne({userId:id});
        let branch;
        if (manager) {
            branch = await this.branchRepository.findOne({id: manager.branchId})
        }
        const user =  await this.userRepository.findOne({id: id})
        return {
            manager: {...manager, branch: branch} ,
            user: user
        }
    }

    async createNewManager(newUserDto: NewUserDto, newManagerDto: NewManagerDto) {
        if (newUserDto.roleId > 5) return new HttpException(
            ["Invalid Role!"],
            HttpStatus.BAD_REQUEST,
        );
        const newUser = this.userRepository.create(newUserDto);
        newUser.fullName = newUser.firstName + ' ' + newUser.lastName;
        const saltOrRounds = 10;
        newUser.passwordHash =  await bcrypt.hash(
            newUserDto.password,
            saltOrRounds,
        );
        const newUserEntity = await this.userRepository.save(newUser);

        const newStaff = await this.managerRepository.create(newManagerDto);
        newStaff.userId = newUserEntity.id;
        return {
            user: newUserEntity,
            manager: await this.managerRepository.save(newStaff)
        }
    }

    async updateManagerDetail(id: number, updateManagerDto: UpdateManagerDetailDto) {
        const managerUpdate = await this.managerRepository.update(
            {userId: id},
            updateManagerDto.updateManager
        )
        const userUpdate = await this.userRepository.update(
            {id: id},
            {...updateManagerDto.updateUser, fullName: updateManagerDto.updateUser.firstName + ' ' + updateManagerDto.updateUser.lastName}
        )

        return {managerUpdate, userUpdate}
    }

    async getAllBranches() {
        return await this.branchRepository.find()
    }
}