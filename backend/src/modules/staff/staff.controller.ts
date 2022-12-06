import {StaffService} from "./staff.service";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";
import { Controller,  Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpStatus, HttpCode} from '@nestjs/common';
import {FindUserDto} from "../../shared/request/findUser.dto";
import {CreateStaffDto} from "./dto/createStaff.dto";
import {UpdateStaffDto} from "./dto/updateStaff.dto";


@ApiTags('Staffs')
@Controller({
    path: 'staffs',
    version: '1',
})
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getListStaffs(@Param()  findUserDto: FindUserDto) {
        return this.staffService.getList(findUserDto)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getStaffDetail(@Param('id') id: number) {
        return this.staffService.getStaffDetail(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNewStaff(@Body('body') body: CreateStaffDto) {
        return this.staffService.createNewStaff(body.newUserDto, body.newStaffDto)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    updateStaffDetail(@Param('id') id: number, @Body('detail') detail: UpdateStaffDto) {
        return this.staffService.updateStaffDetail(id, detail)
    }
}