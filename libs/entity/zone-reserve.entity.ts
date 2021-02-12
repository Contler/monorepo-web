import { HotelEntity } from './hotel.entity';
import { CategoryEntity } from './category.entity';
import { ScheduleEntity } from '@contler/entity/schedule.entity';

export class ZoneReserveEntity {
  id!: number;

  name!: string;

  icon!: string;

  hotel!: HotelEntity;

  category!: CategoryEntity;

  schedule!: ScheduleEntity[];

  subZone: ZoneReserveEntity[];

  zoneParent: ZoneReserveEntity;
}
