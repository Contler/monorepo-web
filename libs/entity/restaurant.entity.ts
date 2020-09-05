import { HotelEntity } from './hotel.entity';

export class RestaurantEntity {
  uid!: string;

  name!: string;

  hotel!: HotelEntity;
}
