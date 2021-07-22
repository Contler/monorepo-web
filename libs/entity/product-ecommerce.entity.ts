import { EcommerceEntity } from './ecommerce.entity';

export class ProductEcommerceEntity {
  id!: number;

  name!: string;

  price!: number;

  status!: boolean;

  category!: EcommerceEntity;

  orders!: EcommerceEntity[];
}
