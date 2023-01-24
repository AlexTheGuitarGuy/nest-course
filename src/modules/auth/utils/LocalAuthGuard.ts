import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard extends AuthGuard('local') {
  async canActivate(context) {
    const request = context.switchToHttp().getRequest() as Request;
    return request.isAuthenticated();
  }
}
