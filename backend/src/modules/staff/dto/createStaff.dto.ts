import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {NewStaffDto} from "./newStaff.dto";
import {NewUserDto} from "../../manager/dto/newUser.dto";

export class CreateStaffDto {
    @ApiProperty({
        type: NewUserDto,
        example: new NewUserDto()
    })
    newUserDto: NewUserDto;

    @ApiProperty({
        type: NewStaffDto,
        example: new NewStaffDto()
    })
    newStaffDto: NewStaffDto;


}
