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
        description: createProductDto.description || '',
        points: createProductDto.points || [],
        order: createProductDto.order ?? 0,
        adminId,
      },
    });
  }

  async findAll(adminId: string) {
    return this.prisma.product.findMany({
      where: { adminId },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findAllPublic() {
    return this.prisma.product.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
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

    const { id: _id, adminId: _adminId, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = updateProductDto as any;

    return this.prisma.product.update({
      where: { id },
      data,
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
