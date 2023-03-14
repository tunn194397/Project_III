import {SupplyService} from "./supply.service";
import {ApiParam, ApiQuery, ApiTags, ApiBearerAuth, ApiOperation, ApiBody} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import {AuthGuard} from "@nestjs/passport";
import {NewSupplyDto} from "./dto/CreateSupply.dto";
import {UpdateSupplyDto} from "./dto/UpdateSupply.dto";
import {Causes} from "../../config/exception/causes";


@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Supply')
@Controller({
    path: 'supply',
    version: '1',
})
export class SupplyController {
    constructor(private readonly supplyService: SupplyService) {}

    @Get()
    @ApiOperation({description: 'Get list', summary: 'Get list'})
    @HttpCode(HttpStatus.OK)
    @ApiQuery({name : 'page', required: false})
    @ApiQuery({name : 'pageSize', required: false, enum: [0,5,10,15,20]})
    @ApiQuery({name : 'startDate', required: false})
    @ApiQuery({name : 'endDate', required: false})
    @ApiQuery({name : 'status', required: false, enum: ['ACTIVE', 'DELETED', 'NON_ACTIVE']})
    @ApiQuery({name : 'searchString', required: false})
    @ApiQuery({name : 'orderField', required: false, enum: ['id', 'name', 'representativeName', 'createdAt']})
    @ApiQuery({name : 'orderBy', required: false, enum: ['ASC', 'DESC']})
    getList(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('startDate') startDate: number,
        @Query('endDate') endDate: number,
        @Query('status') status: string,
        @Query('searchString') searchString: string,
        @Query('orderField') orderField: string,
        @Query('orderBy') orderBy: string,
    ) {
        return this.supplyService.getList(page, pageSize, startDate, endDate, status ,searchString , orderField , orderBy )
    }

    @Get(':id')
    @ApiOperation({description: 'Get detail', summary: 'Get detail'})
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: number) {
        return this.supplyService.getDetail(id)
    }

    @Post()
    @ApiOperation({description: 'Create', summary: 'Create'})
    @ApiBody({required: true, type: NewSupplyDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: NewSupplyDto) {
        const result = this.supplyService.create(body)
        if (!result) throw Causes.USER_ERROR;
        else return result
    }

    @Post(':id')
    @ApiOperation({description: 'Update', summary: 'Update'})
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiBody({required: true, type: UpdateSupplyDto})
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() detail: UpdateSupplyDto) {
        return this.supplyService.update(id, detail)
    }

    @Delete(':id')
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiOperation({description: 'Delete', summary: 'Delete'})
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: number) {
        return this.supplyService.delete(id)
    }

    @Post(':id/restore')
    @ApiParam({name: 'id', required: true, type: Number})
    @ApiOperation({description: 'Restore', summary: 'Restore'})
    @HttpCode(HttpStatus.OK)
    restore(@Param('id') id: number) {
        return this.supplyService.restore(id)
    }

}