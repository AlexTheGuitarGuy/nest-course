import { NestFactory } from '@nestjs/core';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';

import { AppModule } from './app.module';
import entities, { SessionEntity } from './typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '#5e7g@tM0J9FfqybQ',
    database: 'tutorial_db',
    entities,
  });

  const connection = await dataSource.initialize();

  const sessionRepository = connection.getRepository(SessionEntity);

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
      store: new TypeormStore({ cleanupLimit: 10 }).connect(sessionRepository),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
