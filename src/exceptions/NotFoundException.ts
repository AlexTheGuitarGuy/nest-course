import { HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundErrorMessageData } from './types';

export class NotFoundException extends HttpException {
  constructor(
    messageData?: NotFoundErrorMessageData,
    status: HttpStatus = 404,
  ) {
    let message = 'Not Found.';

    if (messageData) {
      const { entity, key, value } = messageData;
      message = `Could not find ${entity} with ${key} ${value}.`;
    }

    super(message, status || 404);
  }
}
