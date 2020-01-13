import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'api/user/user.module';
import { GuestModule } from 'api/guest/guest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from 'api/environments/environment';
import { HotelEntity } from 'api/entities/hotel.entity';
import { EmployerEntity } from 'api/entities/employer.entity';

@Module({
  imports: [UserModule, GuestModule, TypeOrmModule.forRoot({
    type: 'postgres',
    url: environment.db,
    entities: [HotelEntity, EmployerEntity],
    extra: {
      ssl: true
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
