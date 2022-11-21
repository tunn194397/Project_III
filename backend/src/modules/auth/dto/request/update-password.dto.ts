import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    type: String,
    example: 'old_password',
  })
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword?: string;
}
