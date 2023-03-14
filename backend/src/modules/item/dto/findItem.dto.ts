import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";
import * as QueryString from "querystring";

export class FindItemDto {
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
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    minPrice: number;

    @ApiProperty({
        type: Number,
        example: 1000000000,
        required: false
    })
    @IsOptional()
    maxPrice: number;

    @ApiProperty({
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    supplyId: number;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    deviceType: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    branch: string;

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