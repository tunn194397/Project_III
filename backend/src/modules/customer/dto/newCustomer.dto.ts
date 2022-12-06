import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class NewCustomerDto {
    @ApiProperty({
        type: String,
        example: 'STAFF',
    })
    registerType: string;

    @ApiProperty({
        type: Number,
        example: 10,
    })
    registerStaffId: number;
}
