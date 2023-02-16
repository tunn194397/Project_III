import {DeviceService} from "./device.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";
import { Controller,  Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpStatus, HttpCode} from '@nestjs/common';
import {FindUserDto} from "../../shared/request/findUser.dto";


@ApiTags('Device')
@Controller({
    path: 'device',
    version: '1',
})
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Get('/type')
    @HttpCode(HttpStatus.OK)
    getListMainType() {
        return this.deviceService.getAllDeviceMainType()
    }

    @Get('/type/{:id}')
    @HttpCode(HttpStatus.OK)
    getListChildren(@Param() id: number) {
        return this.deviceService.getAllDeviceChildrenType(id)
    }

    @Get('/parameter/')
    @HttpCode(HttpStatus.OK)
    getListParameter(@Query('typeId') typeId: number) {
        return this.deviceService.getAllDeviceParameterOfType(typeId);
    }

    @Get('/type-have-parameter/')
    @HttpCode(HttpStatus.OK)
    getListDeviceTypeHaveParameter() {
        return this.deviceService.getAllDeviceTypeHaveParameter();
    }

}