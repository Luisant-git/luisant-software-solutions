import { IsString, IsArray, MinLength, IsOptional, IsInt } from 'class-validator';
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

  @ApiProperty({ example: 'Download Demo', description: 'Button name', required: false })
  @IsOptional()
  @IsString()
  buttonName?: string;

  @ApiProperty({ example: 'https://example.com', description: 'Button URL', required: false })
  @IsOptional()
  @IsString()
  buttonUrl?: string;

  @ApiProperty({ example: 'https://example.com/banner.jpg', description: 'Desktop banner URL', required: false })
  @IsOptional()
  @IsString()
  banner?: string;

  @ApiProperty({ example: 'https://example.com/mobile-banner.jpg', description: 'Mobile banner URL', required: false })
  @IsOptional()
  @IsString()
  mobileBanner?: string;

  @ApiProperty({ example: 1, description: 'Display order (1 = first, 2 = second...)', required: false })
  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'Billing Software', description: 'Product name', required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiProperty({ example: 'billing-software', description: 'URL slug', required: false })
  @IsOptional()
  @IsString()
  @MinLength(3)
  slug?: string;

  @ApiProperty({ example: 'Complete billing solution', description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @ApiProperty({ example: ['Feature 1', 'Feature 2'], description: 'Feature points', required: false })
  @IsOptional()
  @IsArray()
  points?: string[];

  @ApiProperty({ example: 'Download Demo', description: 'Button name', required: false })
  @IsOptional()
  @IsString()
  buttonName?: string;

  @ApiProperty({ example: 'https://example.com', description: 'Button URL', required: false })
  @IsOptional()
  @IsString()
  buttonUrl?: string;

  @ApiProperty({ example: 'https://example.com/banner.jpg', description: 'Desktop banner URL', required: false })
  @IsOptional()
  @IsString()
  banner?: string;

  @ApiProperty({ example: 'https://example.com/mobile-banner.jpg', description: 'Mobile banner URL', required: false })
  @IsOptional()
  @IsString()
  mobileBanner?: string;

  @ApiProperty({ example: 1, description: 'Display order (1 = first, 2 = second...)', required: false })
  @IsOptional()
  @IsInt()
  order?: number;
}
