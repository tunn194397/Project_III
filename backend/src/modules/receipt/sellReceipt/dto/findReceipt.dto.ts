import {ApiProperty} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class FindReceiptDto {
    @ApiProperty({
        type: String,
        example: 1,
        required: false
    })
    @IsOptional()
    page: number = 1;

    @ApiProperty({
        type: String,
        example: 10,
        required: false
    })
    @IsOptional()
    pageSize: number = 10;

    @ApiProperty({
        type: String,
        example: 10,
        required: false
    })
    @IsOptional()
    customerId: number = 0;

    @ApiProperty({
        type: String,
        example: 10,
        required: false
    })
    @IsOptional()
    staffId: number = 0;

    @ApiProperty({
        type: String,
        example: 0,
        required: false
    })
    @IsOptional()
    minPrice: number = 0;

    @ApiProperty({
        type: String,
        example: 10000000000,
        required: false
    })
    @IsOptional()
    maxPrice: number = 10000000000;

    @ApiProperty({
        type: String,
        example: 0,
        required: false
    })
    @IsOptional()
    minSaleOff: number = 0;

    @ApiProperty({
        type: String,
        example: 10,
        required: false
    })
    @IsOptional()
    maxSaleOff: number = 100;

    @ApiProperty({
        type: String,
        example: 'tu',
        required: false
    })
    @IsOptional()
    searchString: string = '';

    @ApiProperty({
        type: String,
        example: 'name',
        required: false
    })
    @IsOptional()
    orderField: string = 'id';

    @ApiProperty({
        type: String,
        example: 'DESC',
        required: false
    })
    @IsOptional()
    orderBy: string = 'DESC';

}