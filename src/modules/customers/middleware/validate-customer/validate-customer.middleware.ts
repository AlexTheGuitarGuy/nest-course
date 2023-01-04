import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { InvalidTokenException } from '../../../../exceptions/InvalidTokenException';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedException();
    if (authorization !== '123') throw new InvalidTokenException();

    next();
  }
}
