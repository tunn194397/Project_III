import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsNotExist } from 'src/shared/utils/validators/is_not_exists.validator';

export class RegisterRequestDTO {
  @ApiProperty({
    type: String,
    example: 'admin',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'usernameAlreadyExists',
  })
  username: string;

  @ApiProperty({
    type: String,
    example: '123456',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

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
    example: 'admin@gmail.com',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  email: string;


  @ApiProperty({
    type: String,
    example: '0929484015',
  })
  @IsNotEmpty()
  @MinLength(6)
  phone: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  roleId: number;
}
