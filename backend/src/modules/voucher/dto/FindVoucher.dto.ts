import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";
import * as QueryString from "querystring";

export class FindVoucherDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    page: number;

    @ApiProperty({
        type: Number,
        example: 10,
        required: false
    })
    @IsOptional()
    pageSize: number;

    @ApiProperty({
        type: String,
        example: 1,
        required: false
    })
    @IsOptional()
    deviceType: string;

    @ApiProperty({
        type: String,
        example: 1,
        required: false
    })
    @IsOptional()
    deviceBranch: string;

    @ApiProperty({
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    startedAt: number;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    finishedAt: number;

    @ApiProperty({
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    minOff: number;

    @ApiProperty({
        type: Number,
        example: 100,
        required: false
    })
    @IsOptional()
    maxOff: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    status: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    searchString: string;

    @ApiProperty({
        type: String,
        example: 'id',
        required: false
    })
    @IsOptional()
    orderField: string;

    @ApiProperty({
        type: String,
        example: 'DESC',
        required: false
    })
    @IsOptional()
    orderBy: string;


}