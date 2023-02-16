import {ImportReceiptService} from "./importReceipt.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query} from "@nestjs/common";
import {CreateManagerDto} from "../../manager/dto/createManager.dto";
import {UpdateManagerDto} from "../../manager/dto/updateManager.dto";
import {FindReceiptDto} from "./dto/findReceipt.dto";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateTotalItemDto} from "../../item/dto/createTotalItem.dto";
import {CreateTotalImportReceiptDto} from "./dto/createTotalImportReceipt.dto";
import {UpdateImportReceiptDto} from "./dto/updateImportReceipt.dto";
import {UpdateTotalImportReceiptDto} from "./dto/updateTotalImportReceipt.dto";
import {FindHomeDataDto} from "../../item/dto/findHomeData.dto";

@ApiTags('Import Receipt')
@Controller({
    path: 'receipt/import',
    version: '1',
})
export class ImportReceiptController {
    constructor(private readonly importReceiptService: ImportReceiptService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getList(@Query('') findReceiptDto: FindReceiptDto) {
        return this.importReceiptService.getList(findReceiptDto)
    }

    @Get('/home')
    @HttpCode(HttpStatus.OK)
    getAllHomeData(@Query('') findHomeDataDto: FindHomeDataDto) {
        return this.importReceiptService.getAllHomeData(findHomeDataDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.importReceiptService.getDetail(id)
    }

    @Post()
    @ApiBody({required: true, type: CreateTotalImportReceiptDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateTotalImportReceiptDto) {
        console.log(body)
        return this.importReceiptService.create(body.receipt, body.receiptItems)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateTotalImportReceiptDto: UpdateTotalImportReceiptDto) {
        return this.importReceiptService.update(id, updateTotalImportReceiptDto)
    }

}