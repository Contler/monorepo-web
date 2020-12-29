import { IsNotEmpty } from 'class-validator';
import { RestaurantEntity } from '@contler/entity/restaurant.entity';
import { Language } from "./language.model";

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


  to: Language;

  from: Language[];

}
