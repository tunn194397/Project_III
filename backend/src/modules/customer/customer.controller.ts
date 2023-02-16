import {CustomerService} from "./customer.service";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";
import { Controller,  Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpStatus, HttpCode} from '@nestjs/common';
import {Causes} from "../../config/exception/causes";
import {CreateCustomerDto} from "./dto/createCustomer.dto";
import {UpdateDto} from "./dto/update.dto";


@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.staff)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Customer')
@Controller({
    path: 'customer',
    version: '1',
})
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get('')
    @ApiOperation({description: 'Get list', summary: 'Get list'})
    @HttpCode(HttpStatus.OK)
    @ApiQuery({name : 'page', required: false})
    @ApiQuery({name : 'pageSize', required: false, enum: [0,5,10,15,20]})
    @ApiQuery({name: 'registerStaffId', required: false})
    @ApiQuery({name: 'registerType', required: false, enum: ['STAFF', 'CUSTOMER', 'MANAGER']})
    @ApiQuery({name: 'level', required: false, enum: ['NEW', '1 YEAR', '2 YEAR', '5 YEAR']})
    @ApiQuery({name: 'minScore', required: false})
    @ApiQuery({name: 'maxScore', required: false})
    @ApiQuery({name : 'status', required: false, enum: ['ACTIVE', 'DELETED', 'NON_ACTIVE']})
    @ApiQuery({name : 'searchString', required: false})
    @ApiQuery({name : 'orderField', required: false, enum: ['id', 'name', 'representativeName', 'createdAt']})
    @ApiQuery({name : 'orderBy', required: false, enum: ['ASC', 'DESC']})
    getList(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('registerStaffId') registerStaffId: number,
        @Query('registerType') registerType: string,
        @Query('level') level: string,
        @Query('minScore') minScore: number,
        @Query('maxScore') maxScore: number,
        @Query('status') status: string,
        @Query('searchString') searchString: string,
        @Query('orderField') orderField: string,
        @Query('orderBy') orderBy: string,
    ) {
        return this.customerService.getList(page, pageSize, registerStaffId, registerType,  level , minScore, maxScore, status,searchString , orderField , orderBy  )
    }

    @Get(':id')
    @ApiOperation({description: 'Get detail', summary: 'Get detail'})
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.customerService.getDetail(id)
    }

    @Post()
    @ApiOperation({description: 'Create', summary: 'Create'})
    @ApiBody({required: true, type: CreateCustomerDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateCustomerDto) {
        const result = this.customerService.create(body.newUserDto, body.newCustomerDto)
        if (!result) throw Causes.USER_ERROR;
        else return result
    }

    @Post(':id')
    @ApiOperation({description: 'Update', summary: 'Update'})
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiBody({required: true, type: UpdateDto })
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body('') detail: UpdateDto) {
        console.log(id, detail)
        return this.customerService.update(id, detail)
    }

    @Delete(':id')
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiOperation({description: 'Delete', summary: 'Delete'})
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: number) {
        return this.customerService.delete(id)
    }

    @Post(':id/restore')
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiOperation({description: 'Restore', summary: 'Restore'})
    @HttpCode(HttpStatus.OK)
    restore(@Param('id') id: number) {
        return this.customerService.restore(id)
    }

}