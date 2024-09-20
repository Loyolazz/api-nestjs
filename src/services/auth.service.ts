import {
  InvalidPasswordException,
  UnauthorizedException,
} from '../utils/exceptions/unauthorized.exception';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.authRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new InvalidPasswordException();
    }
    return {
      token: this.jwtService.sign({ username }),
    };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = await this.authRepository.create(registerDto);
    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }

}
