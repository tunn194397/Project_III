import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    type: String,
    example: 'superAdmin',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}
