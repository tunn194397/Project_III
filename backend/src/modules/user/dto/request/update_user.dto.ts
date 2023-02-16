import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsOptional, MinLength, Validate} from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';
import { CreateUserRequestDTO } from './create_user.dto';

export class UpdateUserRequestDTO {
  @ApiProperty({
    type: String,
    example: 'Tran Kim',
  })
  @IsOptional()
  @MinLength(1)
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Tran Kim',
  })
  @IsOptional()
  @MinLength(1)
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'hungtk@gmail.com',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsOptional()
  email: string | null;

  @ApiProperty({
    type: String,
    example: '0922456713',
  })
  @IsOptional()
  phone: string | null;

  @ApiProperty({
    type: String,
    example: 'Vietnam',
  })
  @IsOptional()
  nationality: string | null;

  @ApiProperty({
    type: String,
    example: 'tkh.img',
  })
  @IsOptional()
  avatarImage: string | null;

  @ApiProperty({
    type: Number,
    example: (new Date()).getTime(),
  })
  @IsOptional()
  birthday: number | null;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsOptional()
  roleID?: number;
}
