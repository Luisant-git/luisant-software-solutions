import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Register a new admin user
   * @param registerDto - Username, email, and password
   * @returns Admin details
   */
  @Post('register')
  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin registered successfully',
    schema: {
      example: {
        id: 'clx123abc',
        username: 'admin',
        email: '<email>',
        message: 'Admin registered successfully',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Username or email already exists',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Login with username and password
   * @param loginDto - Username and password
   * @returns JWT token and admin details
   */
  @Post('login')
  @ApiOperation({ summary: 'Login admin user' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        admin: {
          id: 'clx123abc',
          username: 'admin',
          email: '<email>',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
