import { HotelEntity } from './hotel.entity';
import { RestaurantEntity } from './restaurant.entity';

export class ProductEntity {
  id!: number;

  name!: string;

  value!: number;

  state!: boolean;

  description!: string;

  category!: string;

  hotel!: HotelEntity;

  restaurant: RestaurantEntity;
}
