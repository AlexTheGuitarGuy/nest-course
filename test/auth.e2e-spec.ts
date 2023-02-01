import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as expressSession from 'express-session';
import * as request from 'supertest';
import * as passport from 'passport';

import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');
    app.use(
      expressSession({
        name: 'SessionXD',
        secret: 'dwadnesviusdnmoads9udom',
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 10 * 60 * 1000,
        },
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    await app.init();
  });

  describe('Authentication POST api/auth/login', () => {
    const API_URL = '/api/auth';
    let cookie = '';

    it('should be able to access auth guarded route', () => {
      return request(app.getHttpServer())
        .get(`${API_URL}/status`)
        .set('Cookie', cookie)
        .expect(403, {
          statusCode: 403,
          message: 'Forbidden resource',
          error: 'Forbidden',
        });
    });

    it('should authenticate and return status 200', (done) => {
      request(app.getHttpServer())
        .post(`${API_URL}/login`)
        .send({
          username: 'testestest',
          password: 'testestest',
        })
        .expect(201, {})
        .end((err, res) => {
          cookie = res.headers['set-cookie'];
          done();
        });
    });

    it('should be able to access auth guarded route', () => {
      return request(app.getHttpServer())
        .get(`${API_URL}/status`)
        .set('Cookie', cookie)
        .expect(200);
    });
  });
});
