import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Manager, Staff, User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindUserDto} from "../../shared/request/findUser.dto";
import {NewManagerDto} from "./dto/newManager.dto";
import {NewUserDto} from "./dto/newUser.dto";
import * as bcrypt from 'bcrypt';
import {UpdateManagerDto} from "./dto/updateManager.dto";

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Customer)
        private managerRepository: Repository<Manager>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getListManager(findUserDto: FindUserDto) {
        return this.managerRepository.createQueryBuilder('manager')
            .innerJoin(User, 'user', 'user.id = customer.user_id')
            .where(new Brackets(queryBuilder => {
                queryBuilder.where('user.id = :userId', {userId: findUserDto.userId})
                    .andWhere('user.first_name like :firstName', {firstName: `%${findUserDto.firstName}%`})
                    .andWhere('user.last_name like :lastName', {lastName: `%${findUserDto.lastName}%`})
                    .andWhere('user.phone like :phone', {phone: `%${findUserDto.phone}%`})
                    .andWhere('manager.branchId = :branchId', {branchId: findUserDto.branchId})
                    .andWhere('user.email like :email', {email: `%${findUserDto.email}%`})
                    .andWhere('user.status = :status', {status: findUserDto.status})
                    .andWhere('user.birthday = :birthday', {birthday: findUserDto.birthday})
                    .andWhere('user.full_name like :fullName', {fullName:`%${findUserDto.fullName}%` })
                    .andWhere('user.role_id = :roleId', {roleId: findUserDto.roleId})
            }))
            .getMany()
    }

    async getManagerDetail(id: number) {
        return this.managerRepository.findOne(id)
    }

    async createNewManager(newUserDto: NewUserDto, newManagerDto: NewManagerDto) {
        const newUser = this.userRepository.create(newUserDto);
        newUser.fullName = newUser.firstName + ' ' + newUser.lastName;
        const saltOrRounds = 10;
        newUser.passwordHash =  await bcrypt.hash(
            newUserDto.password,
            saltOrRounds,
        );
        const newUserEntity = await this.userRepository.save(newUser);

        const newManager = await this.managerRepository.create(newManagerDto);
        newManager.userId = newUserEntity.id;
        return await this.managerRepository.save(newManager)
    }

    async updateManagerDetail(id: number, updateManagerDto: UpdateManagerDto) {
        return await this.managerRepository.update(id, updateManagerDto)
    }
}