import { EmployerEntity } from './employer.entity';
import { ZoneEntity } from './zone.entity';
import { RoomEntity } from './room.entity';
import { GuestEntity } from './guest.entity';
import { HotelEntity } from './hotel.entity';

export class RequestEntity {
  id!: number;

  message!: string;

  createAt!: Date;

  finishAt!: Date;

  score!: number;

  comment!: string;

  special!: boolean;

  complete!: boolean;

  attended!: EmployerEntity;

  solved!: EmployerEntity;

  zone!: ZoneEntity;

  room!: RoomEntity;

  guest!: GuestEntity;

  hotel!: HotelEntity;
}
