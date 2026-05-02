import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty()
  category: string;

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
}
