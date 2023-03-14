import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class AddCartDto {
    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsNotEmpty()
    itemId: number;
}
