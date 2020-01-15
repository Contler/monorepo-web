import { HotelEntity } from './hotel.entity';
import { ZoneEntity } from '@contler/entity/zone.entity';

export class EmployerEntity {
  uid!: string;

  name!: string;

  lastName!: string;

  role!: string;

  totalScore!: number;

  totalServices!: number;

  totalTime!: number;

  hotel!: HotelEntity;

  leaderZones!: ZoneEntity[];
}
