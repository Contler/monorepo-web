import { ProductOrderEntity } from '../entity';

export interface RestaurantProductsModel {
  [restaurant: string]: ProductOrderEntity[];
}
