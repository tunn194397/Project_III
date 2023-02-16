import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {IsNotExist} from "../../../shared/utils/validators/is_not_exists.validator";

export class CreateItemDto {
    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    @Validate(IsNotExist, ['Item'], {
        message: 'itemNameAlreadyExists',
    })
    name: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        type: Number,
        example: '',
        required: false
    })
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    @Validate(IsNotExist, ['Item'], {
        message: 'itemImageAlreadyExists',
    })
    image: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    introduce: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    branch: string;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsNotEmpty()
    deviceTypeId: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    status: string;

    @ApiProperty({
        type: Number,
        example: 1111,
        required: false
    })
    @IsNotEmpty()
    productionTime: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsNotEmpty()
    @Validate(IsNotExist, ['Item'], {
        message: 'productionCodeAlreadyExists',
    })
    productionCode: string;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsNotEmpty()
    supplyId: number;

}