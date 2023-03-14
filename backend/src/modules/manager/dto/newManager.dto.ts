import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class NewManagerDto {
    @ApiProperty({
        type: Number,
        example: 1,
    })
    branchId: number;

    @ApiProperty({
        type: String,
        example: 'Certificate'
    })
    certificates: string;

    @ApiProperty({
        type: String,
        example: 'Certificate'
    })
    introduce: string;

    @ApiProperty({
        type: Number,
        example: 20000000
    })
    salary: number;

}
