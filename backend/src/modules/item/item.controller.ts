import {ItemService} from "./item.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query} from "@nestjs/common";
import {FindItemDto} from "./dto/findItem.dto";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateTotalItemDto} from "./dto/createTotalItem.dto";
import {UpdateItemDto} from "./dto/updateItem.dto";
import {UpdateTotalItemDto} from "./dto/updateTotalItem.dto";
import {FindHomeDataDto} from "./dto/findHomeData.dto";

@ApiTags('Item')
@Controller({
    path: 'items',
    version: '1',
})
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getList(@Query('') findItemDto: FindItemDto) {
        return this.itemService.getList(findItemDto)
    }

    @Get('/devices')
    @HttpCode(HttpStatus.OK)
    getAllDeviceType() {
        return this.itemService.getAllDevice()
    }

    @Get('/home')
    @HttpCode(HttpStatus.OK)
    getAllHomeData(@Query('') findHomeDataDto: FindHomeDataDto) {
        return this.itemService.getAllHomeData(findHomeDataDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.itemService.getDetail(id)
    }

    @Post()
    @ApiBody({required: true, type: CreateTotalItemDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateTotalItemDto) {
        return this.itemService.create(body.item, body.itemParameters)
    }
    @Post(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateTotalItemDto: UpdateTotalItemDto) {
        return this.itemService.update(id, updateTotalItemDto)
    }


}