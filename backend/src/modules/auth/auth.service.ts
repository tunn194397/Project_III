import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from 'src/database/entities/User.entity';
import {RoleEnum} from '../roles/roles.enum';
import {UsersService} from '../user/users.service';
import {LoginRequestDTO} from './dto/request/login.dto';
import * as bcrypt from 'bcrypt';
import {RegisterRequestDTO} from './dto/request/register.dto';
import {UpdatePasswordDTO} from './dto/request/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  //login
  async validateLogin( loginDTO: LoginRequestDTO, role: string): Promise<{ token: string; user: User, permission: any}> {
    const user = await this.usersService.findOne({ username: loginDTO.username});
    if ( !user ||
        (user && !(role === 'MANAGER' ? [RoleEnum.supplyManager, RoleEnum.superAdmin, RoleEnum.sellManager, RoleEnum.superManager]
            : ((role === 'STAFF' ? [RoleEnum.sellStaff, RoleEnum.supplyStaff]
                : [RoleEnum.user])).includes(user.roleId)))) {
      throw new HttpException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { username: 'notFound'},
        },
        423, // Account is not available
      );
    }
    const isValidPassword = await bcrypt.compare(
      loginDTO.password,
      user.passwordHash,
    );


    if (isValidPassword) {
      const permission = await this.usersService.getPermissionOfUser(user.id)
      const token = this.jwtService.sign({
        id: user.id,
        role: user.roleId,
        permission: permission
      });

      return { token, user: user, permission: permission };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { password: 'incorrectPassword'},
        },
        424, // Account is not available
      );
    }
  }

  async register(AuthRegisterDTO: RegisterRequestDTO): Promise<User> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      AuthRegisterDTO.password,
      saltOrRounds,
    );

    return await this.usersService.create({
      ...AuthRegisterDTO,
      username: AuthRegisterDTO.username,
      passwordHash: hashPassword,
      email: AuthRegisterDTO.email,
      firstName: AuthRegisterDTO.firstName,
      lastName: AuthRegisterDTO.lastName,
      fullName: AuthRegisterDTO.firstName + " " + AuthRegisterDTO.lastName,
      roleId: AuthRegisterDTO.roleId,
    });
  }

  async updatePassword(
    userID: number,
    updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<User> {
    const currentUser = await this.usersService.findOne({
      id: userID,
    });
    if (updatePasswordDTO.password) {
      if (updatePasswordDTO.oldPassword) {
        const isValidOldPassword = await bcrypt.compare(
          updatePasswordDTO.oldPassword,
          currentUser.passwordHash,
        );

        if (!isValidOldPassword) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                oldPassword: 'incorrectOldPassword',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              oldPassword: 'missingOldPassword',
            },
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    const updateUser = {
      username: currentUser.username,
    };
    await this.usersService.updatePassword(userID, updatePasswordDTO);

    return this.usersService.findOne({
      id: userID,
    });
  }

  async softDelete(user: User): Promise<void> {
    await this.usersService.softDelete(user.id);
  }

  async getPermissionOfUser(userId: number ) : Promise<any> {
    return await this.usersService.getPermissionOfUser(userId)
  }
}
