import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePortfolioCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
