import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private logoUrl: string;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    this.logoUrl = process.env.LOGO_URL ?? 'https://luisant.in/logo-luisant-software-solutions.png';
  }

  async sendAppointmentEmail(appointmentData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message?: string;
  }): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Appointment Request - ${appointmentData.name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #1C77C3 0%, #1a5fa0 100%); padding: 30px 20px; text-align: center;">
              <img src="${this.logoUrl}" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Appointment Request</h1>
            </div>
            
            <div style="background-color: white; padding: 40px 30px; margin: 0;">
              <p style="color: #333; font-size: 16px; margin-bottom: 25px;">A new appointment request has been received:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <tr style="background-color: #f0f4f8;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; width: 35%; border-bottom: 1px solid #e0e0e0;">Name</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${appointmentData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">Email</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${appointmentData.email}</td>
                </tr>
                <tr style="background-color: #f0f4f8;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">Phone</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${appointmentData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">Service</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${appointmentData.service}</td>
                </tr>
                ${appointmentData.message ? `<tr style="background-color: #f0f4f8;"><td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0; vertical-align: top;">Message</td><td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${appointmentData.message}</td></tr>` : ''}
              </table>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 20px;">
                Please review this appointment request and contact the client to confirm the details.
              </p>
            </div>
            
            <div style="background-color: #1C77C3; padding: 25px 30px; text-align: center; color: white;">
              <p style="margin: 0 0 10px 0; font-size: 14px;">
                <strong>Luisant Software Solutions</strong>
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.9;">
                This is an automated email from the appointment system.
              </p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendConfirmationEmail(email: string, name: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Appointment Confirmation - Luisant Software Solutions',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #1C77C3 0%, #1a5fa0 100%); padding: 30px 20px; text-align: center;">
              <img src="${this.logoUrl}" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Appointment Confirmation</h1>
            </div>
            
            <div style="background-color: white; padding: 40px 30px; margin: 0;">
              <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Dear ${name},</p>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">Thank you for scheduling an appointment with Luisant Software Solutions!</p>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">We have received your appointment request and will contact you shortly to confirm the details.</p>
              
              <div style="background-color: #f0f4f8; padding: 20px; border-left: 4px solid #1C77C3; margin-bottom: 25px;">
                <p style="color: #1C77C3; font-weight: 600; margin: 0 0 10px 0;">Contact Information:</p>
                <p style="color: #333; margin: 8px 0; font-size: 14px;"><strong>Phone:</strong> +91 427 405 6538</p>
                <p style="color: #333; margin: 8px 0; font-size: 14px;"><strong>Mobile:</strong> +91 90803 56538</p>
                <p style="color: #333; margin: 8px 0; font-size: 14px;"><strong>Email:</strong> info@luisantsoftwares.com</p>
              </div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6;">If you have any questions or need to reschedule, please don't hesitate to reach out to us.</p>
            </div>
            
            <div style="background-color: #1C77C3; padding: 25px 30px; text-align: center; color: white;">
              <p style="margin: 0 0 10px 0; font-size: 14px;">
                <strong>Luisant Software Solutions</strong>
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.9;">
                This is an automated email from the appointment system.
              </p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      return false;
    }
  }

  async sendCareerApplicationEmail(careerData: {
    name: string;
    email: string;
    mobile: string;
    city?: string;
    skills?: string;
    resumeUrl?: string;
  }): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Career Application - ${careerData.name}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #1C77C3 0%, #1a5fa0 100%); padding: 30px 20px; text-align: center;">
              <img src="${this.logoUrl}" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Career Application</h1>
            </div>
            
            <div style="background-color: white; padding: 40px 30px; margin: 0;">
              <p style="color: #333; font-size: 16px; margin-bottom: 25px;">A new career application has been received:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <tr style="background-color: #f0f4f8;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; width: 35%; border-bottom: 1px solid #e0e0e0;">Name</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${careerData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">Email</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${careerData.email}</td>
                </tr>
                <tr style="background-color: #f0f4f8;">
                  <td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">Mobile</td>
                  <td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${careerData.mobile}</td>
                </tr>
                ${careerData.city ? `<tr><td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">City</td><td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${careerData.city}</td></tr>` : ''}
                ${careerData.skills ? `<tr style="background-color: #f0f4f8;"><td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0; vertical-align: top;">Skills</td><td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;">${careerData.skills}</td></tr>` : ''}
                ${careerData.resumeUrl ? `<tr><td style="padding: 12px 15px; font-weight: 600; color: #1C77C3; border-bottom: 1px solid #e0e0e0;">Resume</td><td style="padding: 12px 15px; color: #333; border-bottom: 1px solid #e0e0e0;"><a href="${careerData.resumeUrl}" style="color: #1C77C3; text-decoration: none; font-weight: 600;">Download Resume</a></td></tr>` : ''}
              </table>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 20px;">
                Please review this career application and contact the applicant if interested.
              </p>
            </div>
            
            <div style="background-color: #1C77C3; padding: 25px 30px; text-align: center; color: white;">
              <p style="margin: 0 0 10px 0; font-size: 14px;">
                <strong>Luisant Software Solutions</strong>
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.9;">
                This is an automated email from the career application system.
              </p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending career application email:', error);
      return false;
    }
  }

  async sendCareerConfirmationEmail(email: string, name: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Application Received - Luisant Software Solutions',
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #1C77C3 0%, #1a5fa0 100%); padding: 30px 20px; text-align: center;">
              <img src="${this.logoUrl}" alt="Logo" style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Application Received</h1>
            </div>
            
            <div style="background-color: white; padding: 40px 30px; margin: 0;">
              <p style="color: #333; font-size: 16px; margin-bottom: 20px;">Dear ${name},</p>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">Thank you for applying to Luisant Software Solutions!</p>
              
              <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">We have received your career application and our team will review it carefully. If your profile matches our requirements, we will contact you for further discussions.</p>
              
              <div style="background-color: #f0f4f8; padding: 20px; border-left: 4px solid #1C77C3; margin-bottom: 25px;">
                <p style="color: #1C77C3; font-weight: 600; margin: 0 0 10px 0;">Contact Information:</p>
                <p style="color: #333; margin: 8px 0; font-size: 14px;"><strong>Phone:</strong> +91 427 405 6538</p>
                <p style="color: #333; margin: 8px 0; font-size: 14px;"><strong>Mobile:</strong> +91 90803 56538</p>
                <p style="color: #333; margin: 8px 0; font-size: 14px;"><strong>Email:</strong> info@luisantsoftwares.com</p>
              </div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6;">We appreciate your interest in joining our team. Best of luck!</p>
            </div>
            
            <div style="background-color: #1C77C3; padding: 25px 30px; text-align: center; color: white;">
              <p style="margin: 0 0 10px 0; font-size: 14px;">
                <strong>Luisant Software Solutions</strong>
              </p>
              <p style="margin: 0; font-size: 12px; opacity: 0.9;">
                This is an automated email from the career application system.
              </p>
            </div>
          </div>
        `,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Error sending career confirmation email:', error);
      return false;
    }
  }
}
