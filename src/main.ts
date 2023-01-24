import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressSession from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    expressSession({
      name: 'SessionXD',
      secret: 'dwadnesviusdnmoads9udom',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60 * 1000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
