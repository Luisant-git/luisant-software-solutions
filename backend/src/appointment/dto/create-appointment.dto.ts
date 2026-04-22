import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  @IsString()
  @MinLength(2)
  name: string = '';

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsEmail()
  email: string = '';

  @ApiProperty({ example: '+91 9080356538', description: 'Phone number' })
  @IsString()
  phone: string = '';

  @ApiProperty({ example: 'IT Company', description: 'Business type', required: false })
  @IsOptional()
  @IsString()
  businessType?: string = '';

  @ApiProperty({ example: 'Billing Software', description: 'Service name' })
  @IsString()
  @MinLength(3)
  service: string = '';

  @ApiProperty({ example: '2024-01-15', description: 'Preferred appointment date' })
  @IsString()
  date: string = '';

  @ApiProperty({ example: '10:00 AM', description: 'Preferred appointment time' })
  @IsString()
  time: string = '';

  @ApiProperty({ example: 'Please call before visit', description: 'Additional message', required: false })
  @IsOptional()
  @IsString()
  message?: string = '';
}
