import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
