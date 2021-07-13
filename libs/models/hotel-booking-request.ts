import { GuestEntity } from '@contler/entity/guest.entity';
import { HotelEntity } from '@contler/entity/hotel.entity';
import { RoomEntity } from '@contler/entity/room.entity';

export class HotelBookingRequest {
  checkIn: Date;

  checkOut: Date;

  hotel: HotelEntity;

  room: RoomEntity;

  newGuest: {
    name: string;

    lastName: string;

    email: string;

    typeDocument: number;

    document: string;
  }[];

  updateGuest: GuestEntity[];
}
