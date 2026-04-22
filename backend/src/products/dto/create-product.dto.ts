import { IsString, IsArray, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Billing Software', description: 'Product name' })
  @IsString()
  @MinLength(3)
  name: string = '';

  @ApiProperty({ example: 'billing-software', description: 'URL slug' })
  @IsString()
  @MinLength(3)
  slug: string = '';

  @ApiProperty({ example: 'Complete billing solution', description: 'Product description' })
  @IsString()
  @MinLength(10)
  description: string = '';

  @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Feature points' })
  @IsArray()
  points: string[] = [];
}

export class UpdateProductDto {
  @ApiProperty({ example: 'Billing Software', description: 'Product name', required: false })
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: 'billing-software', description: 'URL slug', required: false })
  @IsString()
  @MinLength(3)
  slug?: string;

  @ApiProperty({ example: 'Complete billing solution', description: 'Product description', required: false })
  @IsString()
  @MinLength(10)
  description?: string;

  @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Feature points', required: false })
  @IsArray()
  points?: string[];
}
