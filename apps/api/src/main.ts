/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import "reflect-metadata";
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as admin from 'firebase-admin';

import { AppModule } from './app/app.module';
import { environment } from 'api/environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const credential = environment.fire;
  admin.initializeApp({
    databaseURL: environment.fireDatabase,
    credential: admin.credential.cert(credential as any)
  });
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' );
  });
}

bootstrap();
