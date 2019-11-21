import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HotelService } from 'api/hotel/hotel.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HotelService]
})
export class UserModule {}
