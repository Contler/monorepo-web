import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { HotelEntity, RoomEntity } from '@contler/entity';

export class GuestRequest {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsNumber()
  typeDocument!: number;

  @IsNotEmpty()
  document!: string;

  @IsNotEmpty()
  room!: RoomEntity;

  @IsNotEmpty()
  checkIn!: Date;

  @IsNotEmpty()
  checkOut!: Date;

  @IsNotEmpty()
  hotel!: HotelEntity;
}
