import { IsNotEmpty, IsOptional} from 'class-validator';
import {NewUserDto} from "../../manager/dto/newUser.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {UpdateStaffDto} from "./updateStaff.dto";
import {UpdateUserDto} from "../../manager/dto/updateUser.dto";

export class UpdateStaffDetailDto {
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
        type: UpdateStaffDto,
        example:{
            branchId: 1,
            firstWorkedDate: 10000000000000,
            workingPeriod: '8 years',
            salary: 2000000
        }
    })
    @IsNotEmpty()
    updateStaff: UpdateStaffDto;
}
