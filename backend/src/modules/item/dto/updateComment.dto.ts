import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, Validate} from "class-validator";
import {IsNotExist} from "../../../shared/utils/validators/is_not_exists.validator";

export class UpdateCommentDto {
    @ApiProperty({
        type: String,
        example: "Comment",
        required: true
    })
    @IsNotEmpty()
    message: string;

}