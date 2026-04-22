import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, adminId: string) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { slug: createProductDto.slug },
    });

    if (existingProduct) {
      throw new BadRequestException('Product slug already exists');
    }

    return this.prisma.product.create({
      data: {
        ...createProductDto,
        adminId,
      },
    });
  }

  async findAll(adminId: string) {
    return this.prisma.product.findMany({
      where: { adminId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublic() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, adminId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, adminId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.slug && updateProductDto.slug !== product.slug) {
      const existingSlug = await this.prisma.product.findUnique({
        where: { slug: updateProductDto.slug },
      });

      if (existingSlug) {
        throw new BadRequestException('Product slug already exists');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async delete(id: string, adminId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, adminId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
