import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.usersService.getUsers().map((user) => new SerializedUser(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);

    if (!user)
      throw new HttpException(
        `User with name ${username} not found.`,
        HttpStatus.NOT_FOUND,
      );

    return new SerializedUser(user);
  }
}
