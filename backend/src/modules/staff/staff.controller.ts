import {StaffService} from "./staff.service";
import {ApiBearerAuth, ApiBody, ApiParam, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Post, Body, Param, Query, HttpStatus, HttpCode, UseGuards} from '@nestjs/common';
import {CreateStaffDto} from "./dto/createStaff.dto";
import {UpdateStaffDetailDto} from "./dto/updateStaffDetail.dto";
import {FindStaffDto} from "./dto/findStaff.dto";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";

@ApiTags('Staffs')
@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
    path: 'staffs',
    version: '1',
})
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getListStaffs(@Query()  findDto: FindStaffDto) {
        return this.staffService.getList(findDto)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getStaffDetail(@Param('id') id: number) {
        return this.staffService.getStaffDetail(id)
    }

    @Post()
    @ApiBody({required: true, type: CreateStaffDto})
    @HttpCode(HttpStatus.CREATED)
    createNewStaff(@Body() body: CreateStaffDto) {
        return this.staffService.createNewStaff(body.newUserDto, body.newStaffDto)
    }

    @Post(':id')
    @ApiBody({required: true, type: UpdateStaffDetailDto})
    @ApiParam({name: 'id', required: true, type: Number})
    @HttpCode(HttpStatus.OK)
    updateStaffDetail(@Param('id') id: number, @Body('') detail: UpdateStaffDetailDto) {
        return this.staffService.updateStaffDetail(id, detail)
    }
}