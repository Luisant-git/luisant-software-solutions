import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Username' })
  @IsString()
  username: string = '';

  @ApiProperty({ example: 'password123', description: 'Password (minimum 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string = '';
}
