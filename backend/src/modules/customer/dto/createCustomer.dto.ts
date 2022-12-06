import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {NewCustomerDto} from "./newCustomer.dto";
import {NewUserDto} from "../../manager/dto/newUser.dto";

export class CreateCustomerDto {
    @ApiProperty({
        type: NewUserDto,
        example: new NewUserDto()
    })
    newUserDto: NewUserDto;

    @ApiProperty({
        type: NewCustomerDto,
        example: new NewCustomerDto()
    })
    newCustomerDto: NewCustomerDto;


}
