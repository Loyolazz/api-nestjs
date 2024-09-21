import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from '../messages/auth.message'; // Ajuste o caminho conforme necessário

/**
 * Exceção personalizada para acesso não autorizado.
 * Estende a classe HttpException para fornecer uma resposta de erro personalizada.
 *
 * @throws {UnauthorizedException} - Lança quando o usuário não está autorizado a acessar um recurso.
 */
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
/**
 * Exceção personalizada para senha inválida.
 * Estende a classe HttpException para fornecer uma resposta de erro personalizada.
 *
 * @throws {InvalidPasswordException} - Lança quando a senha fornecida é inválida.
 */
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

/**
 * Exceção personalizada para nome de usuário em uso.
 * Estende a classe HttpException para fornecer uma resposta de erro personalizada.
 *
 * @throws {UsernameInUseException} - Lança quando o nome de usuário fornecido já está em uso.
 */
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

