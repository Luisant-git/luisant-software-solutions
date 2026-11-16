import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio-category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(req.user.id, createPortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get('public/all')
  findAllPublic() {
    return this.portfolioService.findAllPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get('categories')
  findAllCategories() {
    return this.portfolioService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Post('categories')
  createCategory(@Body() createPortfolioCategoryDto: CreatePortfolioCategoryDto) {
    return this.portfolioService.createCategory(createPortfolioCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: string,
    @Body() updatePortfolioCategoryDto: UpdatePortfolioCategoryDto,
  ) {
    return this.portfolioService.updateCategory(id, updatePortfolioCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.portfolioService.removeCategory(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.portfolioService.findByCategory(category);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.portfolioService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}
