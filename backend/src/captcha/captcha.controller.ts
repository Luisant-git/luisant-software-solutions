import { Controller, Post, Body, Get } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private captchaService: CaptchaService) {}

  @Get('generate')
  generateCaptcha() {
    return this.captchaService.generateCaptcha();
  }

  @Post('verify')
  verifyCaptcha(@Body() body: { id: string; code: string }) {
    const isValid = this.captchaService.verifyCaptcha(body.id, body.code);
    return { valid: isValid };
  }
}
