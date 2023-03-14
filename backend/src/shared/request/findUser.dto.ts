import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class FindUserDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    userId: number;

    @ApiProperty({
        type: String,
        example: 'Nguyen',
        required: false
    })
    @IsOptional()
    firstName: string;

    @ApiProperty({
        type: String,
        example: 'Tu',
        required: false
    })
    @IsOptional()
    lastName: string;

    @ApiProperty({
        type: String,
        example: '094586',
        required: false
    })
    @IsOptional()
    phone: string;

    @ApiProperty({
        type: String,
        example: 'admin',
        required: false
    })
    @IsOptional()
    email: string;

    @ApiProperty({
        type: String,
        example: 'ACTIVE',
        required: false
    })
    @IsOptional()
    status: string;

    @ApiProperty({
        type: Number,
        example: 10000000,
        required: false
    })
    @IsOptional()
    birthday: number;

    @ApiProperty({
        type: String,
        example: 'Nguyen Ngoc Tu',
        required: false
    })
    @IsOptional()
    fullName: string;

    @ApiProperty({
        type: Array,
        example: ['1','2','6'],
        required: false
    })
    @IsOptional()
    roleId: Array<number>;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    branchId: number;

    @ApiProperty({
        type: Date,
        example: new Date(),
        required: false
    })
    @IsOptional()
    firstWorkedDate: Date;

    @ApiProperty({
        type: String,
        example: '10 Years',
        required: false
    })
    @IsOptional()
    workingPeriod: string;

    @ApiProperty({
        type: String,
        example: 'STAFF',
        required: false
    })
    @IsOptional()
    registerType: string;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    registerStaffId: number;

    @ApiProperty({
        type: String,
        example: 'NEW',
        required: false
    })
    @IsOptional()
    level: string;

    @ApiProperty({
        type: Number,
        example: 100,
        required: false
    })
    @IsOptional()
    score: number;
}
