import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateSellReceiptDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsNotEmpty()
    customerId: number;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsNotEmpty()
    staffId: number;

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
    voucherId: number;

}