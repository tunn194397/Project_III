import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {IsNotExist} from "../../../shared/utils/validators/is_not_exists.validator";

export class UpdateItemDto {
    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    @Validate(IsNotExist, ['Item'], {
        message: 'itemNameAlreadyExists',
    })
    name: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    type: string;

    @ApiProperty({
        type: Number,
        example: '',
        required: false
    })
    @IsOptional()
    price: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    content: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    @Validate(IsNotExist, ['Item'], {
        message: 'itemImageAlreadyExists',
    })
    image: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    introduce: string;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    branch: string;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    deviceTypeId: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    status: string;

    @ApiProperty({
        type: Number,
        example: 1111,
        required: false
    })
    @IsOptional()
    productionTime: number;

    @ApiProperty({
        type: String,
        example: '',
        required: false
    })
    @IsOptional()
    @Validate(IsNotExist, ['Item'], {
        message: 'productionCodeAlreadyExists',
    })
    productionCode: string;

    @ApiProperty({
        type: Number,
        example: 1,
        required: false
    })
    @IsOptional()
    supplyId: number;

}