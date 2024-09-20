import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '../messages/auth.message'; // Ajuste o caminho conforme necessário

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: MESSAGES.UNAUTHORIZED.code,
        message: MESSAGES.UNAUTHORIZED.description,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class InvalidPasswordException extends HttpException {
  constructor() {
    super(
      {
        statusCode: MESSAGES.INVALID_PASSWORD.code,
        message: MESSAGES.INVALID_PASSWORD.description,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UsernameInUseException extends HttpException {
  constructor() {
    super(
      {
        statusCode: MESSAGES.CONFLICT_USERNAME.code,
        message: MESSAGES.CONFLICT_USERNAME.description,
      },
      HttpStatus.CONFLICT,
    );
  }
}

