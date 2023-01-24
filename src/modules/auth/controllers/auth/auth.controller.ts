import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedGuard, LocalAuthGuard } from '../../utils/LocalAuthGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {}

  @Get('')
  getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  getAuthStatus(@Req() request: Request) {
    console.log('hui');
    return request.user;
  }
}
