import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {UpdateImportReceiptDto} from "./updateImportReceipt.dto";
import {UpdateImportItemReceiptDto} from "./updateImportItemReceipt.dto";

export class UpdateTotalImportReceiptDto {
    @ApiModelProperty({
        type: UpdateImportReceiptDto,
        example: {
            supplyId: 1,
            content: 'The import receipt in 20/3/2022, in 121 Thai Ha, Dong Da, Ha Noi',
            note: '',
            saleOff: 2
        }
    })
    @IsNotEmpty()
    receipt: UpdateImportReceiptDto;

    @ApiModelProperty({
        type: Array,
        example: [
            {
                itemId: 1,
                quantity: 15
            },
            {
                itemId: 3,
                quantity: 10,
            },
            {
                itemId: 4,
                quantity: 7,
            },
            {
                itemId: 5,
                quantity: 8,
            },
            {
                itemId: 6,
                quantity: 6,
            }
        ]
    })
    @IsNotEmpty()
    receiptItems: UpdateImportItemReceiptDto[];


}