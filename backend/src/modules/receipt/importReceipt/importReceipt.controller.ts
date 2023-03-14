import {ImportReceiptService} from "./importReceipt.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import {CreateManagerDto} from "../../manager/dto/createManager.dto";
import {UpdateManagerDto} from "../../manager/dto/updateManager.dto";
import {FindReceiptDto} from "./dto/findReceipt.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateTotalImportReceiptDto} from "./dto/createTotalImportReceipt.dto";
import {UpdateTotalImportReceiptDto} from "./dto/updateTotalImportReceipt.dto";
import {FindHomeDataDto} from "../../item/dto/findHomeData.dto";
import {Roles} from "../../roles/roles.decorator";
import {RoleEnum} from "../../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../../roles/roles.guard";


@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
        return this.importReceiptService.create(body.receipt, body.receiptItems)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateTotalImportReceiptDto: UpdateTotalImportReceiptDto) {
        return this.importReceiptService.update(id, updateTotalImportReceiptDto)
    }

}