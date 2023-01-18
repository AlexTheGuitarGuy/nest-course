import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() request) {
    return {};
  }

  @Get('')
  getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
  }
}
