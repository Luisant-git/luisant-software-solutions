import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateCareerDto } from './dto/create-career.dto';

@Injectable()
export class CareerService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async submitApplication(createCareerDto: CreateCareerDto) {
    try {
      // Save to database
      const application = await this.prisma.career.create({
        data: {
          name: createCareerDto.name,
          mobile: createCareerDto.mobile,
          email: createCareerDto.email,
          city: createCareerDto.city || null,
          skills: createCareerDto.skills || null,
          resumeUrl: createCareerDto.resumeUrl || null,
        },
      });

      // Send email to admin
      await this.emailService.sendCareerApplicationEmail(createCareerDto);

      // Send confirmation email to applicant
      await this.emailService.sendCareerConfirmationEmail(
        createCareerDto.email,
        createCareerDto.name,
      );

      return {
        success: true,
        message: 'Application submitted successfully',
        data: application,
      };
    } catch (error) {
      console.error('Error submitting career application:', error);
      throw error;
    }
  }

  async getAllApplications() {
    return this.prisma.career.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
