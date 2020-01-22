import { HotelEntity, RoomEntity } from '../entity';
import { GuestEntity } from '@contler/entity';
import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class WakeRequest {
  @IsNotEmpty()
  @Transform(value => value.toString(), { toPlainOnly: true })
  date!: Date;

  @IsNotEmpty()
  @Transform(value => value.toString(), { toPlainOnly: true })
  time!: Date;

  @IsNotEmpty()
  @Transform(value => value.toString(), { toPlainOnly: true })
  totalTime!: Date;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  hotel!: HotelEntity;

  @IsNotEmpty()
  room!: RoomEntity;

  @IsNotEmpty()
  guest!: GuestEntity;
}
