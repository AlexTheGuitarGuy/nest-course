import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User as UserEntity } from '../../../../typeorm';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { encodePassword } from '../../../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user)
      throw new BadRequestException(`User with email ${email} already exists.`);

    const serializedUser = {
      ...createUserDto,
      password: encodePassword(createUserDto.password),
    };

    const newUser = this.userRepository.create(serializedUser);
    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ username });
  }

  findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
