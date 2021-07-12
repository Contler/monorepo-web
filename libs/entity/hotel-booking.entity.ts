import { RoomEntity } from './room.entity';
import { HotelEntity } from './hotel.entity';
import { GuestEntity } from './guest.entity';

export class HotelBookingEntity {
  id: number;

  checkIn: Date;

  checkOut: Date;

  room: RoomEntity;

  hotel: HotelEntity;

  guest: GuestEntity[];
}
