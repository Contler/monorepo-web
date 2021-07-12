import { GuestEntity } from './guest.entity';
import { HotelEntity } from './hotel.entity';
import { RoomEntity } from './room.entity';

export class HotelBookingEntity {
  id: number;

  checkIn: Date;

  checkOut: Date;

  room: RoomEntity;

  hotel: HotelEntity;

  guest: GuestEntity[];
}
