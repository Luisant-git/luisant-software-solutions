import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(adminId: string, createPortfolioDto: CreatePortfolioDto) {
    return this.prisma.portfolio.create({
      data: {
        ...createPortfolioDto,
        adminId,
      },
    });
  }

  async findAll() {
    return this.prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublic() {
    return this.prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        category: true,
        image: true,
        images: true,
        clientName: true,
        technologies: true,
        features: true,
        link: true,
        caseStudy: true,
        results: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findBySlug(slug: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { slug },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return portfolio;
  }

  async findByCategory(category: string) {
    return this.prisma.portfolio.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, updatePortfolioDto: Partial<CreatePortfolioDto>) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  async remove(id: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.prisma.portfolio.delete({
      where: { id },
    });
  }
}
