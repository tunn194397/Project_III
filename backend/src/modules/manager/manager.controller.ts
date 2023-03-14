import {ManagerService} from "./manager.service";
import {ApiBearerAuth, ApiBody, ApiParam, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards} from "@nestjs/common";
import {CreateManagerDto} from "./dto/createManager.dto";
import {FindDto} from "../../helper/dto/find.dto";
import {UpdateManagerDetailDto} from "./dto/updateManagerDetail.dto";
import {Roles} from "../roles/roles.decorator";
import {RoleEnum} from "../roles/roles.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../roles/roles.guard";

@ApiTags('Managers')
@ApiBearerAuth()
@Roles(RoleEnum.superAdmin, RoleEnum.supplyManager, RoleEnum.superManager, RoleEnum.sellManager, RoleEnum.sellStaff, RoleEnum.supplyStaff, RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
    path: 'managers',
    version: '1',
})
export class ManagerController {
    constructor(private readonly managerService: ManagerService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getListManagerWithSearch(@Query('') getManagersDto: FindDto) {
        return this.managerService.getListManagerWithSearch(getManagersDto)
    }

    @Get("/branch")
    @HttpCode(HttpStatus.OK)
    getAllBranches() {
        return this.managerService.getAllBranches();
    }
    
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getManagerDetail(@Param('id') id: number) {
        return this.managerService.getManagerDetail(id)
    }

    @Post()
    @ApiBody({required: true, type: CreateManagerDto})
    @HttpCode(HttpStatus.CREATED)
    createManager(@Body() body: CreateManagerDto) {
        return this.managerService.createNewManager(body.newUserDto, body.newManagerDto)
    }


    @Post(':id')
    @ApiBody({required: true, type: UpdateManagerDetailDto})
    @ApiParam({name: 'id', required: true, type: Number})
    @HttpCode(HttpStatus.OK)
    updateManagerDetail(@Param('id') id: number, @Body() detail: UpdateManagerDetailDto) {
        return this.managerService.updateManagerDetail(id, detail)
    }
}