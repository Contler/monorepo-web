import { EcommerceEntity } from './ecommerce.entity';
import { OrderEcommerceProductEcommerceEntity } from '@contler/entity/order-ecommerce-product-ecommerce.entity';

export class ProductEcommerceEntity {
  id: number;

  name!: string;

  price!: number;

  status!: boolean;

  category!: EcommerceEntity | string;

  orderProduct?: OrderEcommerceProductEcommerceEntity[];
}
