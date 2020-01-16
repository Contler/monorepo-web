import { HotelEntity } from './hotel.entity';
import { RoomEntity } from './room.entity';
import { GuestEntity } from './guest.entity';
import { Transform } from 'class-transformer';


export class WakeUpEntity {
  id!: number;

  @Transform(value => new Date(value), { toClassOnly: true })
  date!: Date;

  @Transform(value => new Date(value), { toClassOnly: true })
  time!: Date;

  @Transform(value => new Date(value), { toClassOnly: true })
  competeDate!: Date;

  name!: string;

  complete!: boolean;


  hotel!: HotelEntity;


  room!: RoomEntity;


  guest!: GuestEntity;
}
