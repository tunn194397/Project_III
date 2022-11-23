import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class FindUserDto {
    @ApiProperty({
        type: Number,
        example: 1,
    })
    userId: number;

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
        example: 'Nguyen Ngoc Tu',
    })
    fullName: string;

    @ApiProperty({
        type: Array,
        example: [1,2,6],
    })
    roleId: Array<number>;

    @ApiProperty({
        type: Number,
        example: 1,
    })
    branchId: number;

    @ApiProperty({
        type: Date,
        example: new Date(),
    })
    firstWorkedDate: Date;

    @ApiProperty({
        type: String,
        example: '10 Years',
    })
    workingPeriod: string;

    @ApiProperty({
        type: String,
        example: 'STAFF',
    })
    registerType: string;

    @ApiProperty({
        type: Number,
        example: 1,
    })
    registerStaffId: number;

    @ApiProperty({
        type: String,
        example: 'NEW',
    })
    level: string;

    @ApiProperty({
        type: Number,
        example: 100,
    })
    score: number;
}
