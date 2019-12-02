import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'api/user/user.module';
import { GuestModule } from 'api/guest/guest.module';

@Module({
  imports: [UserModule, GuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
