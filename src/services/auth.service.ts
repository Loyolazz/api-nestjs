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

  /**
 * Authenticates a user by verifying their credentials and generating a JWT token.
 *
 * @param loginDto - The user's login data.
 * @returns A promise that resolves to an object containing the generated JWT token.
 *
 * @throws {UnauthorizedException} If the user does not exist or the password is incorrect.
 *
 * @example
 * ```typescript
 * const loginData: LoginDto = {
 *   username: 'john_doe',
 *   password: 'secure_password',
 * };
 *
 * try {
 *   const result = await authService.login(loginData);
 *   console.log('Login successful:', result.token);
 * } catch (error) {
 *   console.error('Login failed:', error.message);
 * }
 * ```
 */
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

  /**
 * Registers a new user by hashing the password and creating a new user record.
 *
 * @param registerDto - The user's registration data.
 * @returns A promise that resolves to an object containing the generated JWT token.
 *
 * @throws {UnauthorizedException} If the user already exists.
 * @throws {InternalServerErrorException} If there is an error during the registration process.
 *
 * @example
 * ```typescript
 * const registerData: RegisterDto = {
 *   username: 'john_doe',
 *   password: 'secure_password',
 *   email: 'john.doe@example.com',
 * };
 *
 * try {
 *   const result = await authService.register(registerData);
 *   console.log('Registration successful:', result.token);
 * } catch (error) {
 *   console.error('Registration failed:', error.message);
 * }
 * ```
 */
async register(registerDto: RegisterDto): Promise<any> {
  registerDto.password = await bcrypt.hash(registerDto.password, 10);
  const user = await this.authRepository.create(registerDto);
  return {
    token: this.jwtService.sign({ username: user.username }),
  };
}

}
