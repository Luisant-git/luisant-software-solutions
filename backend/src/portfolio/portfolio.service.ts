import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortfolioDto, UpdatePortfolioDto } from './dto/create-portfolio.dto';
import { CreatePortfolioCategoryDto } from './dto/create-portfolio-category.dto';
import { UpdatePortfolioCategoryDto } from './dto/update-portfolio-category.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  private slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private mapPortfolio(portfolio: any) {
    const { category, ...rest } = portfolio;
    return {
      ...rest,
      category: category?.name ?? null,
    };
  }

  private async resolveCategoryId(categoryId?: string, categoryName?: string) {
    if (categoryId) {
      return categoryId;
    }

    if (!categoryName) {
      throw new BadRequestException('categoryId or category is required');
    }

    const category = await this.prisma.portfolioCategory.findUnique({
      where: { name: categoryName },
    });

    if (!category) {
      throw new NotFoundException(`Portfolio category "${categoryName}" not found`);
    }

    return category.id;
  }

  async create(adminId: string, createPortfolioDto: CreatePortfolioDto) {
    const categoryId = await this.resolveCategoryId(
      createPortfolioDto.categoryId,
      createPortfolioDto.category,
    );

    const { category, categoryId: dtoCategoryId, ...rest } = createPortfolioDto;

    const portfolio = await this.prisma.portfolio.create({
      data: {
        ...rest,
        order: createPortfolioDto.order ?? 0,
        categoryId,
        adminId,
      },
      include: { category: { select: { name: true } } },
    });

    return this.mapPortfolio(portfolio);
  }

  async findAll() {
    const portfolios = await this.prisma.portfolio.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      include: { category: { select: { name: true } } },
    });

    return portfolios.map((portfolio) => this.mapPortfolio(portfolio));
  }

  async findAllPublic() {
    const portfolios = await this.prisma.portfolio.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        order: true,
        category: { select: { name: true } },
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

    return portfolios.map((portfolio) => this.mapPortfolio(portfolio));
  }

  async findBySlug(slug: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { slug },
      include: { category: { select: { name: true } } },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    return this.mapPortfolio(portfolio);
  }

  async findByCategory(category: string) {
    const portfolios = await this.prisma.portfolio.findMany({
      where: { category: { name: category } },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
      include: { category: { select: { name: true } } },
    });

    return portfolios.map((portfolio) => this.mapPortfolio(portfolio));
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    const data: any = { ...updatePortfolioDto };

    // Remove fields that shouldn't be updated first
    delete data.id;
    delete data.adminId;
    delete data.createdAt;
    delete data.updatedAt;

    if (updatePortfolioDto.order !== undefined) {
      data.order = typeof updatePortfolioDto.order === 'number'
        ? updatePortfolioDto.order
        : parseInt(String(updatePortfolioDto.order), 10) || 0;
    }

    // Handle category update
    if (updatePortfolioDto.category || updatePortfolioDto.categoryId) {
      const resolvedCategoryId = await this.resolveCategoryId(
        updatePortfolioDto.categoryId,
        updatePortfolioDto.category,
      );
      delete data.category;
      delete data.categoryId;
      data.categoryId = resolvedCategoryId; // Set the resolved categoryId
    }

    const updated = await this.prisma.portfolio.update({
      where: { id },
      data,
      include: { category: { select: { name: true } } },
    });

    return this.mapPortfolio(updated);
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

  async createCategory(createPortfolioCategoryDto: CreatePortfolioCategoryDto) {
    return this.prisma.portfolioCategory.create({
      data: {
        name: createPortfolioCategoryDto.name,
      },
    });
  }

  async findAllCategories() {
    return this.prisma.portfolioCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async updateCategory(id: string, updatePortfolioCategoryDto: UpdatePortfolioCategoryDto) {
    const category = await this.prisma.portfolioCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Portfolio category not found');
    }

    return this.prisma.portfolioCategory.update({
      where: { id },
      data: {
        name: updatePortfolioCategoryDto.name,
      },
    });
  }

  async removeCategory(id: string) {
    const category = await this.prisma.portfolioCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Portfolio category not found');
    }

    // Explicitly delete referencing portfolios first to avoid database FK restrict errors
    await this.prisma.portfolio.deleteMany({
      where: { categoryId: id },
    });

    return this.prisma.portfolioCategory.delete({
      where: { id },
    });
  }
}
