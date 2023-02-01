import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { SerializedUser } from '../../types';
import { NotFoundException } from '../../../../exceptions/NotFoundException';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();

    const serializedUsers = users.map((user) => new SerializedUser(user));

    return { count: users.length, data: serializedUsers };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('search/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);

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
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);

    if (!user)
      throw new NotFoundException({
        entity: 'user',
        key: 'ID',
        value: id,
      });

    return new SerializedUser(user);
  }

  @UsePipes(ValidationPipe)
  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(createUserDto);
    const { password, ...serializedUser } = createdUser;

    return serializedUser;
  }
}
