import { ProductEcommerceEntity } from './product-ecommerce.entity';
import { GuestEntity } from './guest.entity';

export class OrderEcommerceEntity {
  id!: number;

  products!: ProductEcommerceEntity[];

  guest!: GuestEntity;
}
