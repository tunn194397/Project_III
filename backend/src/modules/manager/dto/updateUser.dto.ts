import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class UpdateUserDto {
    @ApiProperty({
        type: String,
        example: 'Nguyen',
    })
    @IsOptional()
    firstName: string;

    @ApiProperty({
        type: String,
        example: 'Tu',
    })
    @IsOptional()
    lastName: string;

    @ApiProperty({
        type: String,
        example: '094586',
    })
    @IsOptional()
    phone: string;

    @ApiProperty({
        type: String,
        example: 'admin',
    })
    @IsOptional()
    email: string;

    @ApiProperty({
        type: String,
        example: 'ACTIVE',
    })
    @IsOptional()
    status: string;

    @ApiProperty({
        type: Number,
        example: 10000000,
    })
    @IsOptional()
    birthday: number;

}
