import { Controller, Post, Get, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';

@Controller('career')
export class CareerController {
  constructor(private careerService: CareerService) {}

  @Post('apply')
  @UseInterceptors(FileInterceptor('resume'))
  async submitApplication(
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const uploadUrl = process.env.UPLOAD_URL || 'http://localhost:3001';
    const resumeUrl = file ? `${uploadUrl}/uploads/${file.filename}` : undefined;

    const createCareerDto: CreateCareerDto = {
      name: body.name,
      mobile: body.mobile,
      email: body.email,
      city: body.city || undefined,
      skills: body.skills || undefined,
      resumeUrl,
    };

    return this.careerService.submitApplication(createCareerDto);
  }

  @Get('applications')
  async getAllApplications() {
    return this.careerService.getAllApplications();
  }
}
