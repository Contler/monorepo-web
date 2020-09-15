import { IsNotEmpty } from 'class-validator';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';

export class ProductRequest {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  value!: number;

  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  category!: string;

  @IsNotEmpty()
  restaurant!: RestaurantEntity;

  @IsNotEmpty()
  hotelId!: string;
}
