import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class NewUserDto {
    @ApiProperty({
        type: String,
        example: 'Nguyen',
    })
    firstName: string;

    @ApiProperty({
        type: String,
        example: 'Tu',
    })
    lastName: string;

    @ApiProperty({
        type: String,
        example: '094586',
    })
    phone: string;

    @ApiProperty({
        type: String,
        example: 'admin',
    })
    email: string;

    @ApiProperty({
        type: String,
        example: 'ACTIVE',
    })
    status: string;

    @ApiProperty({
        type: Number,
        example: 10000000,
    })
    birthday: number;

    @ApiProperty({
        type: String,
        example: 'newManager',
    })
    username: string;

    @ApiProperty({
        type: String,
        example: '123456',
    })
    password: string;

    @ApiProperty({
        type: Number,
        example: 1,
    })
    roleId: number;

}
