import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor(message = 'Token is invalid.', status: HttpStatus = 403) {
    super(message, status);
  }
}
