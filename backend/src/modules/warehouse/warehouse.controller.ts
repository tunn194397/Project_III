import {WarehouseService} from "./warehouse.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query} from "@nestjs/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {FindWarehouseDto} from "./dto/findWarehouse.dto";

@ApiTags('Warehouse')
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