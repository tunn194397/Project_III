import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {NewUserDto} from "./newUser.dto";
import {NewManagerDto} from "./newManager.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateManagerDto {
    @ApiModelProperty({
        type: NewUserDto,
        example: {
            firstName: "Duong",
            lastName: 'Pham',
            phone: '12345678900',
            email: 'phamduong@gmail.com',
            status: 'ACTIVE',
            birthday: 1258966658,
            username: 'phamduong',
            password: '123456',
            roleId: 1
        }
    })
    @IsNotEmpty()
    newUserDto: NewUserDto;

    @ApiModelProperty({
        type: NewManagerDto,
        example: {
            branchId: 1,
            certificates: "HELLO",
            introduce:  "Introduce",
            salary: 30000000,
        }
    })
    @IsNotEmpty()
    newManagerDto: NewManagerDto;


}
