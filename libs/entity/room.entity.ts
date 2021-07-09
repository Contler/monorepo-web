import { HotelEntity } from './hotel.entity';
import { GuestEntity } from './guest.entity';
import { WakeUpEntity } from './wake-up.entity';
import { RequestEntity } from './request.entity';

export class RoomEntity {
  uid!: string;

  name!: string;

  number!: number;

  hotel!: HotelEntity;

  guest!: GuestEntity[];

  wakeUps!: WakeUpEntity[];

  request!: RequestEntity[];
}
