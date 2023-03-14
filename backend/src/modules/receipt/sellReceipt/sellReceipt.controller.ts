import {SellReceiptService} from "./sellReceipt.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import {CreateManagerDto} from "../../manager/dto/createManager.dto";
import {UpdateManagerDto} from "../../manager/dto/updateManager.dto";
import {FindReceiptDto} from "./dto/findReceipt.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateTotalItemDto} from "../../item/dto/createTotalItem.dto";
import {CreateTotalSellReceiptDto} from "./dto/createTotalSellReceipt.dto";
import {FindHomeDataDto} from "../../item/dto/findHomeData.dto";
import {Roles} from "../../roles/roles.decorator";
import {RoleEnum} from "../../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../../roles/roles.guard";

@ApiTags('Sell Receipt')
@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
    path: 'receipt/sell',
    version: '1',
})
export class SellReceiptController {
    constructor(private readonly sellReceiptService: SellReceiptService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getList(@Query('') findReceiptDto: FindReceiptDto) {
        return this.sellReceiptService.getList(findReceiptDto)
    }

    @Get('/home')
    @HttpCode(HttpStatus.OK)
    getAllHomeData(@Query('') findHomeDataDto: FindHomeDataDto) {
        return this.sellReceiptService.getAllHomeData(findHomeDataDto);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.sellReceiptService.getDetail(id)
    }

    @Post()
    @ApiBody({required: true, type: CreateTotalSellReceiptDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateTotalSellReceiptDto) {
        return this.sellReceiptService.create(body.receipt, body.receiptItems)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateManagerDto: UpdateManagerDto) {
        // return this.importReceiptService.updateManagerDetail(id, updateManagerDto)
        return 0;
    }

}