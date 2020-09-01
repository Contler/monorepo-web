import { IsNotEmpty } from 'class-validator';
import { CategoryEntity, HotelEntity } from '@contler/entity';

export class ReservationRequest {
  @IsNotEmpty()
  name!: string;

  icon!: string;

  @IsNotEmpty()
  category!: CategoryEntity;

  @IsNotEmpty()
  hotel!: HotelEntity;
}
