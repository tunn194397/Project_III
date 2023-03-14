import {WarehouseService} from "./warehouse.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {FindWarehouseDto} from "./dto/findWarehouse.dto";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";

@ApiTags('Warehouse')
@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
    path: 'warehouse',
    version: '1',
})
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getList(@Query('') findWarehouseDto: FindWarehouseDto) {
        return this.warehouseService.getList(findWarehouseDto)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.warehouseService.getDetail(id)
    }
}