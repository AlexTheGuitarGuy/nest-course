import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePasswords } from '../../../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && comparePasswords(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
