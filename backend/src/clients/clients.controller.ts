import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully' })
  async create(@Body() createClientDto: CreateClientDto, @Request() req) {
    return this.clientsService.create(createClientDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all clients for admin' })
  @ApiResponse({ status: 200, description: 'Clients retrieved successfully' })
  async findAll(@Request() req) {
    return this.clientsService.findAll(req.user.id);
  }

  @Get('public/all')
  @ApiOperation({ summary: 'Get all public clients' })
  @ApiResponse({ status: 200, description: 'Public clients retrieved' })
  async findAllPublic() {
    return this.clientsService.findAllPublic();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, description: 'Client retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto, @Request() req) {
    return this.clientsService.update(id, updateClientDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a client' })
  @ApiResponse({ status: 200, description: 'Client deleted successfully' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.clientsService.delete(id, req.user.id);
  }
}
