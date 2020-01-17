import { HotelEntity } from './hotel.entity';
import { ZoneEntity } from './zone.entity';
import { RequestEntity } from './request.entity';

export class EmployerEntity {
  uid!: string;

  name!: string;

  lastName!: string;

  role!: string;

  totalScore!: number;

  averageScore!: number;

  averageTime!: number;

  totalServices!: number;

  totalTime!: number;

  active!: boolean;

  pushToken!: string;

  hotel!: HotelEntity;

  leaderZones!: ZoneEntity[];

  requestAttended!: RequestEntity[];

  requestSolved!: RequestEntity[];
}
