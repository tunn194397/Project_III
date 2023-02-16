import {VoucherService} from "./voucher.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {Causes} from "../../config/exception/causes";
import {NewVoucherDto} from "./dto/NewVoucher.dto";
import {UpdateVoucherDto} from "./dto/UpdateVoucher.dto";
import {FindVoucherDto} from "./dto/FindVoucher.dto";


@ApiTags('Vouchers')
@Controller({
    path: 'vouchers',
    version: '1',
})
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) {}

    @Get()
    @ApiOperation({description: 'Get list', summary: 'Get list'})
    @HttpCode(HttpStatus.OK)
    getList(
        @Query('') findVoucherDto: FindVoucherDto
    ) {
        return this.voucherService.getList(findVoucherDto )
    }

    @Get(':id')
    @ApiOperation({description: 'Get detail', summary: 'Get detail'})
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.voucherService.getDetail(id)
    }

    @Post()
    @ApiOperation({description: 'Create', summary: 'Create'})
    @ApiBody({required: true, type: NewVoucherDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: NewVoucherDto) {
        const result = this.voucherService.create(body)
        if (!result) throw Causes.USER_ERROR;
        else return result
    }

    @Post(':id')
    @ApiOperation({description: 'Update', summary: 'Update'})
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiBody({required: true, type: UpdateVoucherDto})
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() detail: UpdateVoucherDto) {
        return this.voucherService.update(id, detail)
    }
}