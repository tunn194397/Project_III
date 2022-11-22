import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Manager, Staff, User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindUserDto} from "../../shared/request/findUser.dto";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ) {}

    async getList(findUserDto: FindUserDto) {
        return this.customerRepository.createQueryBuilder('customer')
            .innerJoin(User, 'user', 'user.id = customer.user_id')
            .where(new Brackets(queryBuilder => {
                queryBuilder.where('user.id = :userId', {userId: findUserDto.userId})
                    .andWhere('user.first_name = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.last_name = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.phone = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.email = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.status = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.birthday = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.full_name = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('user.role_id = :firstName', {firstName: findUserDto.firstName})
                    .andWhere('customer.register_type = :registerType', {registerType: findUserDto.registerType})
                    .andWhere('customer.register_staff_id = :registerType', {registerStaffId: findUserDto.registerStaffId})
                    .andWhere('customer.level = :level', {level: findUserDto.level})
                    .andWhere('customer.score = :score', {score: findUserDto.score})
            }))

    }

}