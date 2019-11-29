import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Room } from 'lib/models/room';

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
  room!: Room;

  @IsNotEmpty()
  checkIn!: Date;

  @IsNotEmpty()
  checkOut!: Date;
}
