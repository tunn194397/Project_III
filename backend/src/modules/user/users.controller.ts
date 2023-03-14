import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode, Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ApiBearerAuth, ApiBody, ApiParam, ApiTags} from '@nestjs/swagger';
import { infinityPagination } from 'src/shared/utils/infinity_pagination';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { CreateUserRequestDTO } from './dto/request/create_user.dto';
import { UpdateUserRequestDTO } from './dto/request/update_user.dto';
import { UsersService } from './users.service';
import {Causes} from "../../config/exception/causes";
import {UpdateUserBankDetailDto} from "./dto/request/updateBankInformation.dto";

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/bank-information')
  @ApiBody({required: true, type: UpdateUserBankDetailDto})
  @ApiParam({name: 'id', required: true, type: Number})
  @HttpCode(HttpStatus.OK)
  updateUserBankInformation(@Param('id') id: number, @Body() detail: UpdateUserBankDetailDto) {
    return this.usersService.updateBankInformation(id, detail)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserRequestDTO) {
    return this.usersService.create(createProfileDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    if (limit > 50) {
      limit = 50;
    }
    const findManyResult = await this.usersService.findManyWithCondition({});
    return infinityPagination(
      await this.usersService.findManyWithPagination({
        page,
        limit,
      }),
      { page, limit },
      findManyResult.length,
    );
  }

  @Get('/role')
  @Roles(RoleEnum.user, RoleEnum.sellStaff, RoleEnum.superManager, RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.sellManager)
  @HttpCode(HttpStatus.OK)
  async findAllUserWithRole(
      @Query('roleId', ParseIntPipe) roleId: number
  ) {
    if (roleId < 0 || roleId > 7) throw Causes.DATA_INVALID;
    return this.usersService.findAllUserInOneRole(roleId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserRequestDTO,
  ) {
    return this.usersService.update(id, updateProfileDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: number) {
  //   await this.usersService.deleteByProps({ id: id });
  // }
}
