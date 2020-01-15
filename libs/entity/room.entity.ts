import { HotelEntity } from './hotel.entity';
import { GuestEntity } from '@contler/entity/guest.entity';
import { WakeUpEntity } from '@contler/entity/wake-up.entity';

export class RoomEntity {
  uid!: string;

  name!: string;

  hotel!: HotelEntity;

  guest!: GuestEntity;

  wakeUps!: WakeUpEntity[];
}
