import {ManagerService} from "./manager.service";
import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from "@nestjs/common";
import {FindUserDto} from "../../shared/request/findUser.dto";
import {NewManagerDto} from "./dto/newManager.dto";
import {NewUserDto} from "./dto/newUser.dto";
import {UpdateManagerDto} from "./dto/updateManager.dto";
import {CreateManagerDto} from "./dto/createManager.dto";

@ApiTags('Managers')
@Controller({
    path: 'managers',
    version: '1',
})
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getListManager(@Param() getManagersDto: FindUserDto) {
        return this.managerService.getListManager(getManagersDto)
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getManagerDetail(@Param('id') id: number) {
        return this.managerService.getManagerDetail(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createManager(@Body('body') body: CreateManagerDto) {
        return this.managerService.createNewManager(body.newUserDto, body.newManagerDto)
    }

    @Post(':id')
    @HttpCode(HttpStatus.OK)
    updateManagerDetail(@Param('id') id: number, @Body() updateManagerDto: UpdateManagerDto) {
        return this.managerService.updateManagerDetail(id, updateManagerDto)
    }
}