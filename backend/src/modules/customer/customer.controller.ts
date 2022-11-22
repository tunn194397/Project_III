import {CustomerService} from "./customer.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";
import { Controller,  Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpStatus, HttpCode} from '@nestjs/common';
import {FindUserDto} from "../../shared/request/findUser.dto";


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
}