import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {UpdateItemDto} from "./updateItem.dto";
import {UpdateItemParameterDto} from "./updateItemParameter.dto";

export class UpdateTotalItemDto {
    @ApiModelProperty({
        type: UpdateItemDto,
        example: {
            name: "Laptop HP 15s-fq2712TU",
            type: "Laptop",
            productionTime: (new Date('1/2/2023')).getTime(),
            productionCode: '221101761',
            supplyId: 1
        }
    })
    @IsNotEmpty()
    item: UpdateItemDto;

    @ApiModelProperty({
        type: Array,
        example: [
            {
                deviceParameterId: 6,
                value:'',
                detail: 'Văn phòng, Doanh nghiệp, Học sinh - Sinh viên',
            },
            {
                deviceParameterId: 7,
                value:'',
                detail: 'Core i3 , Intel Core thế hệ thứ 11'
            },
        ]
    })
    @IsNotEmpty()
    itemParameters: UpdateItemParameterDto[];


}