import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private emailService: EmailService) {}

  async createAppointment(appointmentDto: CreateAppointmentDto) {
    // Send email to admin
    const adminEmailSent = await this.emailService.sendAppointmentEmail(appointmentDto);

    // Send confirmation email to user
    const userEmailSent = await this.emailService.sendConfirmationEmail(
      appointmentDto.email,
      appointmentDto.name,
    );

    return {
      message: 'Appointment request received successfully',
      adminEmailSent,
      userEmailSent,
      appointment: {
        name: appointmentDto.name,
        email: appointmentDto.email,
        service: appointmentDto.service,
        date: appointmentDto.date,
        time: appointmentDto.time,
      },
    };
  }
}
