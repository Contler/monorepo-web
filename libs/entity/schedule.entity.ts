import { ZoneReserveEntity } from './zone-reserve.entity';
import { Transform } from 'class-transformer';
import { BookingEntity } from './booking.entity';

export class ScheduleEntity {
  id!: number;

  day!: string;

  @Transform((value) => new Date(value), { toClassOnly: true })
  timeInit!: Date;

  @Transform((value) => new Date(value), { toClassOnly: true })
  timeFinish!: Date;

  quota!: number;

  rooms: number;

  active!: boolean;

  reservation!: ZoneReserveEntity;

  booking!: BookingEntity[];
}
