import { Controller, Post, Get, Param, UseInterceptors, UploadedFile, UseGuards, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file provided');
    }

    const result = this.uploadService.uploadFile(file);
    return {
      filename: result.filename,
      url: result.url,
      message: 'File uploaded successfully',
    };
  }

  @Get(':filename')
  @ApiOperation({ summary: 'Download a file' })
  @ApiResponse({ status: 200, description: 'File retrieved successfully' })
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = this.uploadService.getFile(filename);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(file);
  }
}
