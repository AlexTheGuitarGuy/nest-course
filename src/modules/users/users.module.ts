import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [{ provide: 'USERS_SERVICE', useClass: UsersService }],
  exports: [{ provide: 'USERS_SERVICE', useClass: UsersService }],
})
export class UsersModule {}
