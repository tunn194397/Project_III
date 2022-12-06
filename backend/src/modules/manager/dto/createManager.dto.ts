import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {NewUserDto} from "./newUser.dto";
import {NewManagerDto} from "./newManager.dto";

export class CreateManagerDto {
    @ApiProperty({
        type: NewUserDto,
        example: new NewUserDto()
    })
    newUserDto: NewUserDto;

    @ApiProperty({
        type: NewManagerDto,
        example: new NewManagerDto()
    })
    newManagerDto: NewManagerDto;


}
