import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class CreateUserRequestDTO {
  @ApiProperty({
    type: String,
    example: 'hungtk2001',
  })
  @MinLength(6)
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  username: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsNotEmpty()
  @MinLength(6)
  passwordHash: string;

  @ApiProperty({
    type: String,
    example: 'Nguyen Ngoc',
  })
  @IsNotEmpty()
  @MinLength(1)
  firstName: string;

  @ApiProperty({
    type: String,
    example: 'Tu',
  })
  @IsNotEmpty()
  @MinLength(1)
  lastName: string;

  @ApiProperty({
    type: String,
    example: 'Nguyen Ngoc Tu',
  })
  @IsNotEmpty()
  @MinLength(1)
  fullName: string;

  @ApiProperty({
    type: String,
    example: '12345678',
  })
  @IsNotEmpty()
  @MinLength(1)
  phone: string;

  @ApiProperty({
    type: String,
    example: 'tunn@gmail.com',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  email: string | null;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  roleId?: number;
}
