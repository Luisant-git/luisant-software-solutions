import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto, adminId: string) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        adminId,
      },
    });
  }

  async findAll(adminId: string) {
    return this.prisma.client.findMany({
      where: { adminId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublic() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto, adminId: string) {
    const client = await this.prisma.client.findFirst({
      where: { id, adminId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async delete(id: string, adminId: string) {
    const client = await this.prisma.client.findFirst({
      where: { id, adminId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return this.prisma.client.delete({
      where: { id },
    });
  }
}
