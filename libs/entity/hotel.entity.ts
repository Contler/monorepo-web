import { EmployerEntity } from './employer.entity';
import { ZoneEntity } from './zone.entity';
import { RoomEntity } from '@contler/entity/room.entity';

export class HotelEntity {
  uid!: string;

  name!: string;

  color!: string;

  logo!: string;

  employees!: EmployerEntity[];

  zones!: ZoneEntity[];

  rooms!: RoomEntity[];
}
