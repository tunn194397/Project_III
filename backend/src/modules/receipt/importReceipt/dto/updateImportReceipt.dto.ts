import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class UpdateImportReceiptDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    supplyId: number;

    @ApiProperty({
        type: String,
        example: '...',
        required: false
    })
    @IsOptional()
    content: string;

    @ApiProperty({
        type: String,
        example: '...',
        required: false
    })
    @IsOptional()
    note: string;

    @ApiProperty({
        type: Number,
        example: 0,
        required: false
    })
    @IsOptional()
    saleOff: number;

}