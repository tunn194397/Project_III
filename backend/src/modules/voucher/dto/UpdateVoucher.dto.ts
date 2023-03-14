import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {Supply} from "../../../database/entities";

export class UpdateVoucherDto {
    @ApiProperty({
        type: String,
        example: "Ha Noi Computer",
    })
    @IsOptional()
    content: string;

    @ApiProperty({
        type: String,
        example: "Monitor",
    })
    @IsOptional()
    deviceTypeIds: string;

    @ApiProperty({
        type: String,
        example: "hanoicomputer@email.com",
    })
    @IsOptional()
    deviceBranches: string;

    @ApiProperty({
        type: Number,
        example: 123456789,
    })
    @IsOptional()
    startedAt: number;

    @ApiProperty({
        type: Number,
        example: 123456789,
    })
    @IsOptional()
    finishedAt: number;

    @ApiProperty({
        type: Number,
        example: 20,
    })
    @IsOptional()
    offValue: number;

    @ApiProperty({
        type: String,
        example: '20%',
    })
    @IsOptional()
    offString: string;

    @ApiProperty({
        type: String,
        example: 'FINISHED',
    })
    @IsOptional()
    status: string;

}
