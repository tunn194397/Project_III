import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    type: String,
    example: 'tunn',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}
