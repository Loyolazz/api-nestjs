import { AuthService } from '../services/auth.service';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {LoginDto, RegisterDto} from '../dto/user.dto';
import { MESSAGES } from '../utils/messages/user.message';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return res.status(200).json({
          status: HttpStatus.OK,
          message: MESSAGES.LOGIN_SUCCESS.description,
          result: result
      });
    } catch (err) {
      return res.status(500).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: MESSAGES.LOGIN_ERROR.description || MESSAGES.INTERNAL_SERVER_ERROR.description,
      });
    }
  }

  @Post('/register')
  async register(
      @Req() req: Request,
      @Res() res: Response,
      @Body() registerDto: RegisterDto,
  ): Promise<any> {
      try {
          const result = await this.authService.register(registerDto);
          return res.status(200).json({
              status: HttpStatus.OK,
              message: MESSAGES.REGISTER_SUCCESS.description,
              result: result
          });
      } catch (err) {
          return res.status(500).json({
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              message: MESSAGES.REGISTER_ERROR.description || (err as Error).message,
          });
      }
  }
}
