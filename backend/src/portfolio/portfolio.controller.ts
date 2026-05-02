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
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
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
    @Body() updatePortfolioDto: Partial<CreatePortfolioDto>,
  ) {
    return this.portfolioService.update(id, updatePortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}
