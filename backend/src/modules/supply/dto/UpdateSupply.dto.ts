import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {Supply} from "../../../database/entities";
import {Optional} from "@nestjs/common";

export class UpdateSupplyDto {
    @ApiProperty({
        type: String,
        example: "Ha Noi Computer",
    })
    @IsOptional()
    name: string;

    @ApiProperty({
        type: String,
        example: "20 Thanh Thai, Khuong Thuong, Ha Noi",
    })
    @IsOptional()
    address: string;

    @ApiProperty({
        type: String,
        example: "hanoicomputer@email.com",
    })
    @IsOptional() @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        example: "0123456789",
    })
    @IsOptional()
    phone: string;

    @ApiProperty({
        type: String,
        example: "noimage.img",
    })
    @IsOptional()
    imageUrl: string;


    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsOptional()
    representativeId: number;

    @ApiProperty({
        type: String,
        example: "Nguyen Ngoc Tu",
    })
    @IsOptional()
    representativeName: string;

}
