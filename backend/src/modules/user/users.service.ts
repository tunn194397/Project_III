import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/shared/utils/types/entity_condition.type';
import { IPaginationOptions } from 'src/shared/utils/types/pagination_options.type';
import { Repository } from 'typeorm';
import { UpdatePasswordDTO } from '../auth/dto/request/update-password.dto';
import { CreateUserRequestDTO } from './dto/request/create_user.dto';
import { UpdateUserRequestDTO } from './dto/request/update_user.dto';
import * as bcrypt from 'bcrypt';
import {Customer, Manager, Role, RolePermission, Staff, User} from "../../database/entities";
import {RoleEnum} from "../roles/roles.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,

    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>
  ) {}

  async create(createProfileDTO: CreateUserRequestDTO) {
    const user = await this.usersRepository.save(
      this.usersRepository.create(createProfileDTO),
    );

    let userInfo;
    if (createProfileDTO.roleId === RoleEnum.user) {
      userInfo = await this.customerRepository.save(
          this.customerRepository.create({userId: user.id}),
      );
    }
    else if (createProfileDTO.roleId === RoleEnum.sellStaff) {
      userInfo = await this.staffRepository.save(
          this.staffRepository.create({userId: user.id}),
      );
    }
    else {
      userInfo = await this.managerRepository.save(
          this.managerRepository.create({userId: user.id}),
      );
    }

    return user

  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findManyWithCondition(fields: Partial<User>): Promise<User[] | undefined> {
    return this.usersRepository.find({ where: fields });
  }

  findOne(fields: EntityCondition<User>): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: fields });
  }

  async update(
    id: number,
    updateProfileDTO: UpdateUserRequestDTO,
  ): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { id } });
    return this.usersRepository.save({
      ...user, ...updateProfileDTO, fullName: updateProfileDTO.firstName + " " + updateProfileDTO.lastName
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async updatePassword(id: number, updatePasswordDTO: UpdatePasswordDTO) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      updatePasswordDTO.password,
      saltOrRounds,
    );
    let user = await this.usersRepository.findOne({ id });
    return this.usersRepository.save({
      ...user,
      passwordHash: hashPassword,
      updatedAt: Date.now(),
    });
  }

  async getPermissionOfUser(userId: number) {
    const user = await this.usersRepository.findOne(userId);
    const permission = await this.rolePermissionRepository.find({
      roleId: user.roleId
    })
    return permission.map((e: any) => {
      return e.permission;
    })
  }

  async findAllUserInOneRole(roleId: number) {
    const users = await this.usersRepository.find({
      where: {roleId: roleId}
    })
    return {
      result: users
    };
  }

  async updateBankInformation(id: number, detail) {
    let user = await this.usersRepository.findOne({ where: { id } });
    return this.usersRepository.save({
      ...user, ...detail
    });
  }

}
