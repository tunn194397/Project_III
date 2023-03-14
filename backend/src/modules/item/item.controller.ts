import {ItemService} from "./item.service";
import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards} from "@nestjs/common";
import {FindItemDto} from "./dto/findItem.dto";
import {ApiBearerAuth, ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateTotalItemDto} from "./dto/createTotalItem.dto";
import {UpdateItemDto} from "./dto/updateItem.dto";
import {UpdateTotalItemDto} from "./dto/updateTotalItem.dto";
import {FindHomeDataDto} from "./dto/findHomeData.dto";
import {CreateCommentDto} from "./dto/createComment.dto";
import {UpdateCommentDto} from "./dto/updateComment.dto";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";

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
    @ApiBearerAuth()
    @Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBody({required: true, type: CreateTotalItemDto})
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateTotalItemDto) {
        return this.itemService.create(body.item, body.itemParameters)
    }

    @Post(':id')
    @ApiBearerAuth()
    @Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') id: number, @Body() updateTotalItemDto: UpdateTotalItemDto) {
        return this.itemService.update(id, updateTotalItemDto)
    }

    @Post(':id/comment')
    @ApiBearerAuth()
    @Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBody({required: true, type: CreateCommentDto})
    @HttpCode(HttpStatus.CREATED)
    createComment(@Body() body: CreateCommentDto) {
        return this.itemService.createComment(body)
    }

    @Put(':id/comment/:commentId')
    @ApiBearerAuth()
    @Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiBody({required: true, type: CreateCommentDto})
    @HttpCode(HttpStatus.CREATED)
    updateComment(@Param('id') id: number, @Param('commentId') commentId: number, @Body() body: UpdateCommentDto) {
        return this.itemService.updateComment(commentId, id, body)
    }

    @Delete(':id/comment/:commentId')
    @ApiBearerAuth()
    @Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    deleteComment(@Param('id') id: number, @Param('commentId') commentId: number) {
        return this.itemService.deleteComment(commentId, id)
    }


}