import { HotelEntity } from './hotel.entity';

export class ProductEntity {
  id!: number;

  name!: string;

  value!: number;

  state!: boolean;

  description!: string;

  category!: string;

  hotel!: HotelEntity;
}
