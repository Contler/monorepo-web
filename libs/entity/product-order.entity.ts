import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

export class ProductOrderEntity {
  id!: number;

  product!: ProductEntity;

  quantity!: number;

  order!: OrderEntity;
}
