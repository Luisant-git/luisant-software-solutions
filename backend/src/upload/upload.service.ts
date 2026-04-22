import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private uploadsDir = path.join(process.cwd(), 'uploads');
  private baseUrl = process.env.UPLOAD_URL || 'http://localhost:3001';

  constructor() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  uploadFile(file: Express.Multer.File): { filename: string; url: string } {
    if (!file) {
      throw new Error('No file provided');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(this.uploadsDir, filename);

    fs.writeFileSync(filepath, file.buffer);

    return {
      filename,
      url: `${this.baseUrl}/uploads/${filename}`,
    };
  }

  deleteFile(filename: string): boolean {
    const filepath = path.join(this.uploadsDir, filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return true;
    }

    return false;
  }

  getFile(filename: string): Buffer | null {
    const filepath = path.join(this.uploadsDir, filename);

    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath);
    }

    return null;
  }
}
