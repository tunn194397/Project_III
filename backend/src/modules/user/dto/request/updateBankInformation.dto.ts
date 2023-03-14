import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';

export class UpdateUserBankDetailDto {
    @ApiProperty({
        type: String,
        example: 'ViettinBank',
    })
    @IsOptional()
    bankName: string;

    @ApiProperty({
        type: String,
        example: '108802194189',
    })
    @IsOptional()
    bankAccount: string;

    @ApiProperty({
        type: String,
        example: 'NGUYEN NGOC TU',
    })
    @IsOptional()
    bankOwner: string;

    @ApiProperty({
        type: String,
        example: '225555555',
    })
    @IsOptional()
    phone: string;

    @ApiProperty({
        type: String,
        example: '20 Pho Chua Lang',
    })
    @IsOptional()
    address: string;
}
