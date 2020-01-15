import { HotelEntity } from './hotel.entity';
import { RoomEntity } from './room.entity';

export class GuestEntity {
  uid!: string;

  active!: boolean;

  name!: string;

  lastName!: string;

  typeDocument!: number;

  document!: string;

  checkIn!: Date;

  checkOut!: Date;

  hotel!: HotelEntity;

  room!: RoomEntity;
}
