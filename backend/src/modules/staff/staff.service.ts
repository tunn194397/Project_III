import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Staff, Manager,  User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindUserDto} from "../../shared/request/findUser.dto";
import {NewUserDto} from "../manager/dto/newUser.dto";
import {NewManagerDto} from "../manager/dto/newManager.dto";
import {UpdateManagerDto} from "../manager/dto/updateManager.dto";
import * as bcrypt from 'bcrypt';
import {NewStaffDto} from "./dto/newStaff.dto";
import {UpdateStaffDto} from "./dto/updateStaff.dto";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getList(findUserDto: FindUserDto) {
        return this.staffRepository.createQueryBuilder('staff')
            .innerJoin(User, 'user', 'user.id = staff.user_id')
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
            }))
            .getMany()

    }

    async getStaffDetail(id : number) {
        return await this.staffRepository.findOne({id: id})
    }

    async createNewStaff(newUserDto: NewUserDto, newStaffDto: NewStaffDto) {
        const newUser = this.userRepository.create(newUserDto);
        newUser.fullName = newUser.firstName + ' ' + newUser.lastName;
        const saltOrRounds = 10;
        newUser.passwordHash =  await bcrypt.hash(
            newUserDto.password,
            saltOrRounds,
        );
        const newUserEntity = await this.userRepository.save(newUser);

        const newManager = await this.staffRepository.create(newStaffDto);
        newManager.userId = newUserEntity.id;
        return await this.staffRepository.save(newManager)
    }

    async updateStaffDetail(id: number, updateStaffDto: UpdateStaffDto) {
        return await this.staffRepository.update(id, updateStaffDto)
    }


}