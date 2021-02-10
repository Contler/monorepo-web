import { HotelEntity } from './hotel.entity';
import { CategoryEntity } from './category.entity';
import { ScheduleEntity } from './schedule.entity';
import { ZoneReserveEntity } from './zone-reserve.entity';

export class SubZoneReserveEntity {
  id!: number;

  name!: string;

  icon!: string;

  zoneParent!: ZoneReserveEntity;

  hotel!: HotelEntity;

  schedule: ScheduleEntity[];
}
