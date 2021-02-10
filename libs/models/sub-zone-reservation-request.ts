import { IsNotEmpty } from 'class-validator';
import { Language } from './language.model';
import { ZoneReserveEntity } from '../entity/zone-reserve.entity';
import { HotelEntity } from '../entity';

export class SubZoneReservationRequest {
  @IsNotEmpty()
  name!: string;

  icon!: string;

  @IsNotEmpty()
  zoneParent!: ZoneReserveEntity;

  @IsNotEmpty()
  hotel!: HotelEntity;

  @IsNotEmpty()
  to: Language;

  @IsNotEmpty()
  from: Language[];
}
