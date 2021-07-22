import { HotelEntity } from './hotel.entity';
import { CategoryEcommerceEntity } from './category-ecommerce.entity';
import { ProductEcommerceEntity } from '@contler/entity/product-ecommerce.entity';

export class EcommerceEntity {
  id!: string;

  title!: string;

  description!: string;

  status!: boolean;

  hotel!: HotelEntity;

  categories!: CategoryEcommerceEntity[];
}
