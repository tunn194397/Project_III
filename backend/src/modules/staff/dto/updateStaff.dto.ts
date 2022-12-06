import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class UpdateStaffDto {
    @ApiProperty({
        type: Number,
        example: 12,
    })
    branchID: number;

    @ApiProperty({
        type: String,
        example: '20/10/2022'
    })
    firstWorkedDate: string;

    @ApiProperty({
        type: String,
        example: '5 years'
    })
    workingPeriod: string;

    @ApiProperty({
        type: Number,
        example: 20000000
    })
    salary: number;
}
