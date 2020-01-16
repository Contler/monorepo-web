import { EmployerEntity } from './employer.entity';
import { ZoneEntity } from './zone.entity';
import { RoomEntity } from './room.entity';
import { GuestEntity } from './guest.entity';
import { WakeUpEntity } from './wake-up.entity';
import { RequestEntity } from './request.entity';

export class HotelEntity {
  uid!: string;

  name!: string;

  color!: string;

  logo!: string;

  employees!: EmployerEntity[];

  zones!: ZoneEntity[];

  rooms!: RoomEntity[];

  guests!: GuestEntity[];

  wakeUps!: WakeUpEntity[];

  request!: RequestEntity[];
}
