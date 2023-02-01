import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('Creating new user POST api/users', () => {
    const API_URL = '/api/users';

    it('should throw a 400 status when username is empty', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'test@gmail.com',
          username: '',
          password: 'testestest',
        })
        .expect(400, {
          statusCode: 400,
          message: [
            'username must be longer than or equal to 10 characters',
            'username should not be empty',
          ],
          error: 'Bad Request',
        });
    });

    it('should throw a 400 status when username is too short', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'test@gmail.com',
          username: 'w',
          password: 'testestest',
        })
        .expect(400, {
          statusCode: 400,
          message: ['username must be longer than or equal to 10 characters'],
          error: 'Bad Request',
        });
    });

    it('should throw a 400 status when password is empty', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'test@gmail.com',
          username: 'testestest',
          password: '',
        })
        .expect(400, {
          statusCode: 400,
          message: [
            'password must be longer than or equal to 6 characters',
            'password should not be empty',
          ],
          error: 'Bad Request',
        });
    });

    it('should throw a 400 status when password is too short', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'test@gmail.com',
          username: 'testestest',
          password: 'a',
        })
        .expect(400, {
          statusCode: 400,
          message: ['password must be longer than or equal to 6 characters'],
          error: 'Bad Request',
        });
    });

    it('should throw a 400 status when email is empty', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: '',
          username: 'testestest',
          password: 'testestest',
        })
        .expect(400, {
          statusCode: 400,
          message: ['email must be an email', 'email should not be empty'],
          error: 'Bad Request',
        });
    });

    it('should throw a 400 status when email is invalid', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'adwadwdd',
          username: 'testestest',
          password: 'testestest',
        })
        .expect(400, {
          statusCode: 400,
          message: ['email must be an email'],
          error: 'Bad Request',
        });
    });

    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'test@gmail.com',
          username: 'testestest',
          password: 'testestest',
        })
        .expect(201, {
          id: '1',
          email: 'test@gmail.com',
          username: 'testestest',
        });
    });

    it('should throw a duplicate key error', () => {
      return request(app.getHttpServer())
        .post(API_URL)
        .send({
          email: 'test@gmail.com',
          username: 'testestest',
          password: 'testestest',
        })
        .expect(400, {
          statusCode: 400,
          message: 'User with email test@gmail.com already exists.',
          error: 'Bad Request',
        });
    });
  });
});
