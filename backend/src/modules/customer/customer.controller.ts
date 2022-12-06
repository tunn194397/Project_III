import {CustomerService} from "./customer.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";
import { Controller,  Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpStatus, HttpCode} from '@nestjs/common';
import {FindUserDto} from "../../shared/request/findUser.dto";
import {CreateCustomerDto} from "./dto/createCustomer.dto";
import {UpdateCustomerDto} from "./dto/updateCustomer.dto";


@ApiTags('Customers')
@Controller({
    path: 'customers',
    version: '1',
})
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getListCustomers(@Param()  findUserDto: FindUserDto) {
        return this.customerService.getList(findUserDto)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getCustomerDetail(@Param('id') id: number) {
        return this.customerService.getCustomerDetail(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewCustomer(@Body('body') body: CreateCustomerDto) {
        return this.customerService.createNewCustomer(body.newUserDto, body.newCustomerDto)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    updateCustomerDetail(@Param('id') id: number, @Body('detail') detail: UpdateCustomerDto) {
        return this.customerService.updateCustomerDetail(id, detail)
    }
}