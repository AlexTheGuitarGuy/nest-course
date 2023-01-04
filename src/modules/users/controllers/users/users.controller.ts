import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';
import { NotFoundException } from '../../../../exceptions/NotFoundException';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    const users = this.usersService
      .getUsers()
      .map((user) => new SerializedUser(user));

    return { count: users.length, data: users };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.usersService.getUserByUsername(username);

    if (!user)
      throw new NotFoundException({
        entity: 'user',
        key: 'name',
        value: username,
      });

    return new SerializedUser(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);

    if (!user)
      throw new NotFoundException({
        entity: 'user',
        key: 'ID',
        value: id,
      });

    return new SerializedUser(user);
  }
}
