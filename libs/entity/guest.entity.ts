import { HotelEntity } from './hotel.entity';
import { RoomEntity } from './room.entity';
import { WakeUpEntity } from '@contler/entity/wake-up.entity';

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

  wakeUps!: WakeUpEntity[];
}
