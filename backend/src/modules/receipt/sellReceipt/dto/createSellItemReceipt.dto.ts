import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateSellItemReceiptDto {
    @ApiProperty({
        type: String,
        example: 1,
        required: false
    })
    @IsNotEmpty()
    itemId: number;

    @ApiProperty({
        type: String,
        example: 10,
        required: false
    })
    @IsNotEmpty()
    quantity: number;

}