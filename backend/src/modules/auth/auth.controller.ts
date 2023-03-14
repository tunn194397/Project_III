import {Body, Controller, HttpCode, HttpStatus, Param, Post, UseGuards,} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Roles} from '../roles/roles.decorator';
import {RoleEnum} from '../roles/roles.enum';
import {RolesGuard} from '../roles/roles.guard';
import {AuthService} from './auth.service';
import {LoginRequestDTO} from './dto/request/login.dto';
import {RegisterRequestDTO} from './dto/request/register.dto';
import {UpdatePasswordDTO} from './dto/request/update-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(public service: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginRequestDTO: LoginRequestDTO) {
    return this.service.validateLogin(loginRequestDTO, 'USER');
  }

  @Post('manager/login')
  @HttpCode(HttpStatus.OK)
  public async adminLogin(@Body() LoginRequestDTO: LoginRequestDTO) {
    return this.service.validateLogin(LoginRequestDTO, 'MANAGER');
  }

  @Post('staff/login')
  @HttpCode(HttpStatus.OK)
  public async staffLogin(@Body() LoginRequestDTO: LoginRequestDTO) {
    return this.service.validateLogin(LoginRequestDTO, 'STAFF');
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDTO: RegisterRequestDTO) {
    return this.service.register(createUserDTO);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.superAdmin)
  @Roles(RoleEnum.superManager)
  @Roles(RoleEnum.sellManager)
  @Roles(RoleEnum.sellStaff)
  @Roles(RoleEnum.user)
  @Roles(RoleEnum.supplyManager)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(':id/change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Param('id') userID: number,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ) {
    return this.service.updatePassword(userID, updatePasswordDTO);
  }
}
