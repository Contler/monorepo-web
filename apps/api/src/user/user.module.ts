import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HotelService } from 'api/hotel/hotel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEntity } from '../entities/hotel.entity';
import { EmployerEntity } from '../entities/employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity, EmployerEntity])],
  controllers: [UserController],
  providers: [UserService, HotelService]
})
export class UserModule {}
