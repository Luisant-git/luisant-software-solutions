import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    const existingAdmin = await this.prisma.admin.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingAdmin) {
      throw new BadRequestException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      message: 'Admin registered successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      id: admin.id,
      username: admin.username,
      email: admin.email,
    });

    return {
      access_token: token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    };
  }
}
