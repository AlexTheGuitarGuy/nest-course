import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../typeorm';

@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User])],
  providers: [
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    LocalStrategy,
  ],
})
export class AuthModule {}
