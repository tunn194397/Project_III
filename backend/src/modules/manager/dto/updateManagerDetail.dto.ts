import { IsNotEmpty, IsOptional} from 'class-validator';
import {NewUserDto} from "../../manager/dto/newUser.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {UpdateManagerDto} from "./updateManager.dto";
import {UpdateUserDto} from "./updateUser.dto";

export class UpdateManagerDetailDto {
    @ApiModelProperty({
        type: UpdateUserDto,
        example: {
            firstName: "Tran",
            lastName: 'Hung',
            phone: '123456789',
            email: 'hungtran@gmail.com',
            status: 'ACTIVE',
            birthday: 1258966655
        }
    })
    @IsOptional()
    updateUser: UpdateUserDto;

    @ApiModelProperty({
        type: UpdateManagerDto,
        example:{
            branchId: 1,
            certificates: '12/18/2019',
            introduce: '8 years',
            salary: 2000000
        }
    })
    @IsNotEmpty()
    updateManager: UpdateManagerDto;
}
