import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import { CreateUserRequestDTO } from './create_user.dto';

export class UpdateUserRequestDTO {
  @ApiProperty({
    type: String,
    example: 'Tran Kim Hung',
  })
  @IsNotEmpty()
  @MinLength(1)
  fullName: string;

  @ApiProperty({
    type: String,
    example: 'hungtk@gmail.com',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  email: string | null;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  roleID?: number;
}
