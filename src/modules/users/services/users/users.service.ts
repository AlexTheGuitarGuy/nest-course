import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User as UserEntity } from '../../../../typeorm';
import { User } from '../../types';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { encodePassword } from '../../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private users: User[] = [
    { id: 1, name: 'fuck', password: '123456' },
    { id: 2, name: 'fred', password: '123456' },
    { id: 3, name: 'dan', password: '123456' },
    { id: 4, name: 'sanja', password: '123456' },
  ];

  getUsers() {
    return this.users;
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.name === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const serializedUser = {
      ...createUserDto,
      password: encodePassword(createUserDto.password),
    };

    const newUser = this.userRepository.create(serializedUser);
    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ username });
  }
}