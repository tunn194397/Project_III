import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Manager, Staff, User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindUserDto} from "../../shared/request/findUser.dto";
import {NewUserDto} from "../manager/dto/newUser.dto";
import {NewManagerDto} from "../manager/dto/newManager.dto";
import {UpdateManagerDto} from "../manager/dto/updateManager.dto";
import * as bcrypt from 'bcrypt';
import {NewCustomerDto} from "./dto/newCustomer.dto";
import {UpdateCustomerDto} from "./dto/updateCustomer.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getList(findUserDto: FindUserDto) {
        return this.customerRepository.createQueryBuilder('customer')
            .innerJoin(User, 'user', 'user.id = customer.user_id')
            .where(new Brackets(queryBuilder => {
                queryBuilder.where('user.id = :userId', {userId: findUserDto.userId})
                    .andWhere('user.first_name like :firstName', {firstName: `%${findUserDto.firstName}%`})
                    .andWhere('user.last_name like :lastName', {lastName: `%${findUserDto.lastName}%`})
                    .andWhere('user.phone like :phone', {phone: `%${findUserDto.phone}%`})
                    .andWhere('user.email like :email', {email: `%${findUserDto.email}%`})
                    .andWhere('user.status = :status', {status: findUserDto.status})
                    .andWhere('user.birthday = :birthday', {birthday: findUserDto.birthday})
                    .andWhere('user.full_name like :fullName', {fullName:`%${findUserDto.fullName}%` })
                    .andWhere('user.role_id = :roleId', {roleId: findUserDto.roleId})
                    .andWhere('customer.register_type = :registerType', {registerType: findUserDto.registerType})
                    .andWhere('customer.register_staff_id = :registerStaffId', {registerStaffId: findUserDto.registerStaffId})
                    .andWhere('customer.level = :level', {level: findUserDto.level})
                    .andWhere('customer.score = :score', {score: findUserDto.score})
            }))
            .getMany()

    }

    async getCustomerDetail(id : number) {
        return await this.customerRepository.findOne({id: id})
    }

    async createNewCustomer(newUserDto: NewUserDto, newCustomerDto: NewCustomerDto) {
        const newUser = this.userRepository.create(newUserDto);
        newUser.fullName = newUser.firstName + ' ' + newUser.lastName;
        const saltOrRounds = 10;
        newUser.passwordHash =  await bcrypt.hash(
            newUserDto.password,
            saltOrRounds,
        );
        const newUserEntity = await this.userRepository.save(newUser);

        const newManager = await this.customerRepository.create(newCustomerDto);
        newManager.userId = newUserEntity.id;
        return await this.customerRepository.save(newManager)
    }

    async updateCustomerDetail(id: number, updateCustomerDto: UpdateCustomerDto) {
        return await this.customerRepository.update(id, updateCustomerDto)
    }


}