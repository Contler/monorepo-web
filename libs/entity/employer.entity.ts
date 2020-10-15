import { HotelEntity } from './hotel.entity';
import { ZoneEntity } from './zone.entity';
import { RequestEntity } from './request.entity';
import { Interval } from '@contler/models/interval';

export class EmployerEntity {
  uid!: string;

  name!: string;

  lastName!: string;

  role!: string;

  email!: string;

  totalScore!: number;

  averageScore!: number;

  averageTime!: Interval;

  totalServices!: number;

  totalTime!: number;

  active!: boolean;

  wakeZone!: boolean;

  lateZone!: boolean;

  deliveryZone!: boolean;

  receptionZone!: boolean;

  cleanZone!: boolean;

  maintainZone!: boolean;

  pushToken!: string;

  hotel!: HotelEntity;

  leaderZones!: ZoneEntity[];

  requestAttended!: RequestEntity[];

  requestSolved!: RequestEntity[];

  get avgTime() {
    const hours = this.averageTime && 'hours' in this.averageTime ? this.averageTime.hours + ' hrs' : '';
    const minutes =
      this.averageTime && 'minutes' in this.averageTime ? this.averageTime.minutes + ' mins' : '';
    const seconds =
      this.averageTime && 'seconds' in this.averageTime ? this.averageTime.seconds + ' secs' : '';
    return [hours, minutes, seconds].join(' ').trim();
  }
}
