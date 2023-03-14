import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {CreateSellReceiptDto} from "./createSellReceipt.dto";
import {CreateSellItemReceiptDto} from "./createSellItemReceipt.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTotalSellReceiptDto {
    @ApiModelProperty({
        type: CreateSellReceiptDto,
        example: {
            customerId: 1,
            staffId: 6,
            content: 'Nguyen Ngoc Tu first receipt for Branch Thai Ha',
            note: '',
            voucherId: 1
        }
    })
    @IsNotEmpty()
    receipt: CreateSellReceiptDto;

    @ApiModelProperty({
        type: Array,
        example: [
            {
                itemId: 1,
                quantity: 1
            },
            {
                itemId: 2,
                quantity: 1
            },
        ]
    })
    @IsNotEmpty()
    receiptItems: CreateSellItemReceiptDto[];


}