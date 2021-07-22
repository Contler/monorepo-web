import { ProductEcommerceEntity } from './product-ecommerce.entity';
import { OrderEcommerceEntity } from './order-ecommerce.entity';

export class OrderEcommerceProductEcommerceEntity {
  id!: number;

  quantity: number;

  product!: ProductEcommerceEntity;

  order!: OrderEcommerceEntity;
}
