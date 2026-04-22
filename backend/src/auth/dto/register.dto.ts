import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'admin', description: 'Username' })
  @IsString()
  @MinLength(3)
  username: string = '';

  @ApiProperty({ example: 'admin@example.com', description: 'Email address' })
  @IsEmail()
  email: string = '';

  @ApiProperty({ example: 'password123', description: 'Password (minimum 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string = '';
}
