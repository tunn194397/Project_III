import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class FindWarehouseDto {
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
    minTotalQuantity: number = 0;

    @ApiProperty({
        type: Number,
        example: 1000000000,
        required: false
    })
    @IsOptional()
    maxTotalQuantity: number;

    @ApiProperty({
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    minSoleQuantity: number = 0;

    @ApiProperty({
        type: Number,
        example: 1000000000,
        required: false
    })
    @IsOptional()
    maxSoleQuantity: number;

    @ApiProperty({
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    minRemainQuantity: number = 0;

    @ApiProperty({
        type: Number,
        example: 1000000000,
        required: false
    })
    @IsOptional()
    maxRemainQuantity: number;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    itemId: number;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    deviceTypeId: number;

    @ApiProperty({
        type: String,
        example: 'ASUS',
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