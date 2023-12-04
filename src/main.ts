import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import *  as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }));
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'hayirlisi',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4004);
}

bootstrap();
