import { HotelEntity } from './hotel.entity';
import { CategoryEntity } from './category.entity';
import { ScheduleEntity } from '@contler/entity/schedule.entity';
import { SubZoneReserveEntity } from './sub-zone-reserve.entity';

export class ZoneReserveEntity {
  id!: number;

  name!: string;

  icon!: string;

  hotel!: HotelEntity;

  category!: CategoryEntity;

  schedule!: ScheduleEntity[];

  zone: SubZoneReserveEntity[];
}
