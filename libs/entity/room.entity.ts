import { HotelEntity } from './hotel.entity';
import { GuestEntity } from '@contler/entity/guest.entity';

export class RoomEntity {
  uid!: string;

  name!: string;

  hotel!: HotelEntity;

  guest!: GuestEntity;
}
