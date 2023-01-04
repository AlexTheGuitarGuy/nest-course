import { Injectable } from '@nestjs/common';
import { User } from '../../types';

@Injectable()
export class UsersService {
  private users: User[] = [
    { name: 'fuck', password: '123456' },
    { name: 'fred', password: '123456' },
    { name: 'dan', password: '123456' },
    { name: 'sanja', password: '123456' },
  ];

  getUsers() {
    return this.users;
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.name === username);
  }
}
