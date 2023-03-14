import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {IsNotExist} from "../../../shared/utils/validators/is_not_exists.validator";

export class CreateCommentDto {
    @ApiProperty({
        type: Number,
        example: 1,
        required: true
    })
    @IsNotEmpty()
    itemId: number;

    @ApiProperty({
        type: Number,
        example: 1,
        required: true
    })
    @IsNotEmpty()
    reporterId: number;

    @ApiProperty({
        type: String,
        example: "Comment",
        required: true
    })
    @IsNotEmpty()
    message: string;

}