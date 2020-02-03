import { ZoneReserveEntity } from './zone-reserve.entity';
import { Transform } from 'class-transformer';

export class ScheduleEntity {
  id!: number;

  day!: string;

  @Transform(value => new Date(value), { toClassOnly: true })
  timeInit!: Date;

  @Transform(value => new Date(value), { toClassOnly: true })
  timeFinish!: Date;

  quota!: number;

  active!: boolean;

  reservation!: ZoneReserveEntity;
}
