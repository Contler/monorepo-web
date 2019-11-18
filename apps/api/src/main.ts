/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';

import { AppModule } from './app/app.module';
import { environment } from 'src/environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const credential = environment.fire;
  admin.initializeApp({
    databaseURL: environment.fireDatabase,
    credential: admin.credential.cert(credential as any)
  });
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
