import { IsNotEmpty } from 'class-validator';
import { CategoryEntity, HotelEntity } from '@contler/entity';
import { Language } from './language.model';
import { ZoneReserveEntity } from '../entity/zone-reserve.entity';

export class ReservationRequest {
  @IsNotEmpty()
  name!: string;

  icon!: string;

  category!: CategoryEntity;

  @IsNotEmpty()
  hotel!: HotelEntity;

  @IsNotEmpty()
  to: Language;

  @IsNotEmpty()
  from: Language[];

  zoneParent?: ZoneReserveEntity;
}
