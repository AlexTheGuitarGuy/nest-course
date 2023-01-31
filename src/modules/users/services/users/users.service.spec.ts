import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcryptUtils from '../../../../utils/bcrypt';
import { User } from '../../../../typeorm';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    jest
      .spyOn(bcryptUtils, 'encodePassword')
      .mockReturnValue('encoded password');

    it('should call encodePassword correctly', () => {
      service.createUser({
        email: 'alex@gmail.com',
        username: 'Alex',
        password: '123',
      });

      expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('123');
    });

    it('should call userRepository.create with correct params', () => {
      service.createUser({
        email: 'alex@gmail.com',
        username: 'Alex',
        password: '123',
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        email: 'alex@gmail.com',
        username: 'Alex',
        password: 'encoded password',
      });
    });

    it('should call userRepository.save with correct params', () => {
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id: 1,
        email: 'alex@gmail.com',
        username: 'Alex',
        password: 'encoded password',
      });

      service.createUser({
        email: 'alex@gmail.com',
        username: 'Alex',
        password: '123',
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        id: 1,
        email: 'alex@gmail.com',
        username: 'Alex',
        password: 'encoded password',
      });
    });
  });
});
