import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    return this.productsService.create(createProductDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products for admin' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  async findAll(@Request() req) {
    return this.productsService.findAll(req.user.id);
  }

  @Get('public/all')
  @ApiOperation({ summary: 'Get all public products' })
  @ApiResponse({ status: 200, description: 'Public products retrieved' })
  async findAllPublic() {
    return this.productsService.findAllPublic();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get product by slug' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Request() req) {
    return this.productsService.update(id, updateProductDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.productsService.delete(id, req.user.id);
  }
}
