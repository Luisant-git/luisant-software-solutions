import { IsString, IsArray, IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsArray()
  @IsNotEmpty()
  technologies: string[];

  @IsArray()
  @IsNotEmpty()
  features: string[];

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  caseStudy?: string;

  @IsArray()
  @IsOptional()
  results?: string[];

  @IsInt()
  @IsOptional()
  order?: number;
}

export class UpdatePortfolioDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsArray()
  @IsOptional()
  technologies?: string[];

  @IsArray()
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  caseStudy?: string;

  @IsArray()
  @IsOptional()
  results?: string[];

  @IsInt()
  @IsOptional()
  order?: number;
}

