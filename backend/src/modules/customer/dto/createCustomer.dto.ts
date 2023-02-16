import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {NewCustomerDto} from "./newCustomer.dto";
import {NewUserDto} from "../../manager/dto/newUser.dto";

export class CreateCustomerDto {
    @ApiProperty({
        type: NewUserDto,
        example: {
            firstName: "Nguyen Do",
            lastName: "Doanh",
            phone: "0396935234",
            email: "doanhcui@gmail.com",
            status: 'ACTIVE',
            birthday: (new Date('01/17/2001')).getTime(),
            username: "doanhcui",
            password: "123456",
            roleId: 6
        }
    })
    @IsNotEmpty()
    newUserDto: NewUserDto;

    @ApiProperty({
        type: NewCustomerDto,
        example: {
            registerType: 'STAFF',
            registerStaffId: 6
        }
    })
    @IsNotEmpty()
    newCustomerDto: NewCustomerDto;


}
