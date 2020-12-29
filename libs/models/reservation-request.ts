import { IsNotEmpty } from 'class-validator';
import { CategoryEntity, HotelEntity } from '@contler/entity';
import { Language } from './language.model';

export class ReservationRequest {
  @IsNotEmpty()
  name!: string;

  icon!: string;

  @IsNotEmpty()
  category!: CategoryEntity;

  @IsNotEmpty()
  hotel!: HotelEntity;

  @IsNotEmpty()
  to: Language;

  @IsNotEmpty()
  from: Language[];
}
