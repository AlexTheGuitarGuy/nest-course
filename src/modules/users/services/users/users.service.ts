import { Injectable } from '@nestjs/common';
import { User } from '../../types';

@Injectable()
export class UsersService {
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
}
