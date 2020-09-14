import { HotelEntity } from './hotel.entity';
import { ProductEntity } from './product.entity';

export class RestaurantEntity {
  uid!: string;

  name!: string;

  hotel!: HotelEntity;

  products!: ProductEntity[];
}
