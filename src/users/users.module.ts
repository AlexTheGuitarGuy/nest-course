import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [{ provide: 'USERS_SERVICE', useClass: UsersService }],
})
export class UsersModule {}
