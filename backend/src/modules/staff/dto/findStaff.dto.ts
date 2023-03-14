import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class FindStaffDto {
    @ApiProperty({
        type: String,
        example: 1,
        required: false
    })
    @IsOptional()
    page: number;

    @ApiProperty({
        type: String,
        example: 10,
        required: false
    })
    @IsOptional()
    pageSize: number;

    @ApiProperty({
        type: String,
        example: '< 2',
        enum: ['< 2', '2-5', '5-10', '10-20', '20-50', '>50'],
        required: false
    })
    @IsOptional()
    salary: string;

    @ApiProperty({
        type: String,
        example: '< 2',
        enum: ['< 2', '2-5', '5-10', '10-20', '>20'],
        required: false
    })
    @IsOptional()
    workingPeriod: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    searchString: string;

    @ApiProperty({
        type: String,
        example: 'name',
        required: false
    })
    @IsOptional()
    orderField: string;

    @ApiProperty({
        type: String,
        example: 'ASC',
        required: false
    })
    @IsOptional()
    orderBy: string;

    @ApiProperty({
        type: String,
        example: 5,
        required: false
    })
    @IsOptional()
    staffRoleId: number;

}
