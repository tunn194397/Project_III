import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import {Supply} from "../../../database/entities";

export class NewSupplyDto {
    @ApiProperty({
        type: String,
        example: "Ha Noi Computer",
    })
    @Validate(IsNotExist, ['Supply'], {
        message: 'usernameAlreadyExists',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        example: "20 Thanh Thai, Khuong Thuong, Ha Noi",
    })
    @IsNotEmpty()
    address: string;

    @ApiProperty({
        type: String,
        example: "hanoicomputer@email.com",
    })
    @IsEmail()
    @IsNotEmpty()
    @Validate(IsNotExist, ['Supply'], {
        message: 'emailAlreadyExist',
    })
    email: string;

    @ApiProperty({
        type: String,
        example: "0123456789",
    })
    @Validate(IsNotExist, ['Supply'], {
        message: 'usernameAlreadyExists',
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: String,
        example: "noimage.img",
    })
    @IsNotEmpty()
    imageUrl: string;

    @ApiProperty({
        type: Number,
        example: 1,
    })
    @IsNotEmpty()
    representativeId: number;

    @ApiProperty({
        type: String,
        example: "Nguyen Ngoc Tu",
    })
    representativeName: string;

}
