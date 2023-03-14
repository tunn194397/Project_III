import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import {UpdateUserRequestDTO} from "../../user/dto/request/update_user.dto";
import {UpdateCustomerDto} from "./updateCustomer.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {UpdateUserDto} from "../../manager/dto/updateUser.dto";

export class UpdateDto {
    @ApiModelProperty({
        type: UpdateUserDto,
        example: {
            firstName: "Nguyen Thi",
            lastName: 'Thu',
            phone: '789152351',
            email: 'thunguyen@gmail.com',
            status: 'ACTIVE',
            birthday: 1258966655
        }
    })
    @IsOptional()
    updateUser: UpdateUserDto;

    @ApiModelProperty({
        type: UpdateCustomerDto,
        example: {
            registerType: 'STAFF',
            registerStaffId: '18',
            level: '1 YEARS',
            score: 8
        }
    })
    @IsOptional()
    updateCustomer: UpdateCustomerDto;
}
