import { PassportSerializer } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { UsersService } from '../../users/services/users/users.service';
import { User } from '../../../typeorm';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    return done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    const userDB = await this.usersService.findUserById(user.id);
    return userDB
      ? done(null, userDB)
      : done({ message: `User with ID ${userDB.id} not found` }, null);
  }
}
