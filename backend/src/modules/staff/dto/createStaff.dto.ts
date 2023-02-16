import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {NewStaffDto} from "./newStaff.dto";
import {NewUserDto} from "../../manager/dto/newUser.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateStaffDto {
    @ApiModelProperty({
        type: NewUserDto,
        example: {
            firstName: "Tran",
            lastName: 'Hung',
            phone: '123456789',
            email: 'hungtran@gmail.com',
            status: 'ACTIVE',
            birthday: 1258966655,
            username: 'hungtran',
            password: '123456',
            roleId: 5
        }
    })
    @IsNotEmpty()
    newUserDto: NewUserDto;

    @ApiModelProperty({
        type: NewStaffDto,
        example:{
            branchId: 1,
            firstWorkedDate: new Date('12/18/2019').getTime(),
            workingPeriod: '8 years',
            salary: 2000000
        }
    })
    @IsNotEmpty()
    newStaffDto: NewStaffDto;


}
