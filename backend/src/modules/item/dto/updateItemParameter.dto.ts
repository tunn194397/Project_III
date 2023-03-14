import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class UpdateItemParameterDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: true
    })
    @IsNotEmpty()
    deviceParameterId: number;

    @ApiProperty({
        type: String,
        example: '12',
        required: true
    })
    @IsOptional()
    value: string;

    @ApiProperty({
        type: String,
        example: 'Just detail',
        required: true
    })
    @IsOptional()
    detail: string;

}