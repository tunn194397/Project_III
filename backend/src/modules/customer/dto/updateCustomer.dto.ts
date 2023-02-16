import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class UpdateCustomerDto {
    @ApiProperty({
        type: String,
        example: 'STAFF',
    })
    @IsOptional()
    registerType: string;

    @ApiProperty({
        type: Number,
        example: 10,
    })
    @IsOptional()
    registerStaffId: number;

    @ApiProperty({
        type: String,
        example: '2_YEAR',
    })
    @IsOptional()
    level: string;

    @ApiProperty({
        type: Number,
        example: 10,
    })
    @IsOptional()
    score: number;
}
