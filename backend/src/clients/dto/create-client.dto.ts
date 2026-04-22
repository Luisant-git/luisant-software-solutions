import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Cool Taxi', description: 'Client name' })
  @IsString()
  @MinLength(2)
  name: string = '';

  @ApiProperty({ example: 'data:image/png;base64,...', description: 'Client logo (base64 or URL)' })
  @IsString()
  logo: string = '';
}

export class UpdateClientDto {
  @ApiProperty({ example: 'Cool Taxi', description: 'Client name', required: false })
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ example: 'data:image/png;base64,...', description: 'Client logo (base64 or URL)', required: false })
  @IsString()
  logo?: string;
}
