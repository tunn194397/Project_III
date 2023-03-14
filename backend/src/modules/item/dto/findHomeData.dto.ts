import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class FindHomeDataDto {
    @ApiProperty({
        type: Number,
        example:  new Date('02/01/2023').getTime(),
        required: false
    })
    @IsOptional()
    startedAt: number;

    @ApiProperty({
        type: Number,
        example: new Date().getTime(),
        required: false
    })
    @IsOptional()
    finishedAt: number;


}