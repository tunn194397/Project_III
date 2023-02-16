import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class NewStaffDto {
    @ApiProperty({
        type: Number,
        example: 12,
    })
    branchId: number;

    @ApiProperty({
        type: Number,
        example: new Date('20/10/2022').getTime()
    })
    firstWorkedDate: number;

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
