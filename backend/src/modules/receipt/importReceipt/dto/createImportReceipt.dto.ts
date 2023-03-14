import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateImportReceiptDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsNotEmpty()
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
    @IsNotEmpty()
    saleOff: number;

}