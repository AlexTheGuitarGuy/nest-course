import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { User } from '../../typeorm';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
