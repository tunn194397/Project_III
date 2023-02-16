import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {Supply} from "../../../database/entities";

export class NewVoucherDto {
    @ApiProperty({
        type: String,
        example: "Ha Noi Computer",
    })
    @Validate(IsNotExist, ['Voucher'], {
        message: 'contentDuplicate',
    })
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        type: Array,
        example: [1,2,3],
    })
    @IsNotEmpty()
    deviceTypeIds: number [];

    @ApiProperty({
        type: Array,
        example: ["HP", "ASUS"]
    })
    @IsNotEmpty()
    deviceBranches: string [];

    @ApiProperty({
        type: Number,
        example: 123456789,
    })
    @IsNotEmpty()
    startedAt: number;

    @ApiProperty({
        type: Number,
        example: 123456789,
    })
    @IsNotEmpty()
    finishedAt: number;

    @ApiProperty({
        type: String,
        example: 123456789,
    })
    @IsNotEmpty()
    image: string;

    @ApiProperty({
        type: Number,
        example: 20,
        minimum: 0,
        maximum: 100
    })
    @IsNotEmpty()
    offValue: number;

}
