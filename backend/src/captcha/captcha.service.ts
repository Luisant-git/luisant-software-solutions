import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CaptchaService {
  private captchaStore = new Map<string, { code: string; timestamp: number }>();
  private readonly EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

  generateCaptcha(): { id: string; image: string } {
    const code = this.generateRandomCode();
    const id = crypto.randomBytes(16).toString('hex');

    // Store captcha with timestamp
    this.captchaStore.set(id, {
      code,
      timestamp: Date.now(),
    });

    // Clean up expired captchas
    this.cleanupExpiredCaptchas();

    return {
      id,
      image: this.generateImage(code),
    };
  }

  private generateRandomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  private generateImage(code: string): string {
    const width = 200;
    const height = 60;

    // Create SVG with text and noise
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        <rect width="${width}" height="${height}" fill="white"/>
        <line x1="10" y1="15" x2="60" y2="5" stroke="#ddd" stroke-width="1"/>
        <line x1="80" y1="55" x2="150" y2="25" stroke="#ddd" stroke-width="1"/>
        <line x1="40" y1="8" x2="120" y2="58" stroke="#ddd" stroke-width="1"/>
        <circle cx="30" cy="30" r="3" fill="#ddd"/>
        <circle cx="170" cy="40" r="3" fill="#ddd"/>
        <text x="15" y="48" font-size="36" font-weight="bold" fill="#1C77C3" font-family="Arial, sans-serif" letter-spacing="4">${code}</text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }

  verifyCaptcha(id: string, userInput: string): boolean {
    const captcha = this.captchaStore.get(id);

    if (!captcha) {
      return false;
    }

    // Check if expired
    if (Date.now() - captcha.timestamp > this.EXPIRY_TIME) {
      this.captchaStore.delete(id);
      return false;
    }

    // Verify code (case-insensitive)
    const isValid = captcha.code === userInput.toUpperCase();

    // Delete after verification attempt
    this.captchaStore.delete(id);

    return isValid;
  }

  private cleanupExpiredCaptchas(): void {
    const now = Date.now();
    for (const [id, data] of this.captchaStore.entries()) {
      if (now - data.timestamp > this.EXPIRY_TIME) {
        this.captchaStore.delete(id);
      }
    }
  }
}
