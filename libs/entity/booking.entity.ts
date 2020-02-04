import { GuestEntity } from './guest.entity';
import { ScheduleEntity } from './schedule.entity';

export class BookingEntity {
  id!: number;

  date!: Date;

  quote!: number;

  name!: string;

  description!: string;

  active!: boolean;

  guest!: GuestEntity;

  schedule!: ScheduleEntity;
}
