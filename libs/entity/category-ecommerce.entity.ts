import { EcommerceEntity } from './ecommerce.entity';
import { ProductEcommerceEntity } from './product-ecommerce.entity';

export class CategoryEcommerceEntity {
  id!: number;

  name!: string;

  ecommerce!: EcommerceEntity;

  products!: ProductEcommerceEntity[];
}
