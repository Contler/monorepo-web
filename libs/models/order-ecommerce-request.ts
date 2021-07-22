import { GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
import { ProductListModel } from '@contler/models/product-list-model';
import { IsNotEmpty } from 'class-validator';
import { EcommerceEntity } from '@contler/entity/ecommerce.entity';
import { ProductEcommerceEntity } from '@contler/entity/product-ecommerce.entity';

export class OrderEcommerceRequest {
  @IsNotEmpty()
  hotel!: HotelEntity;

  @IsNotEmpty()
  guest!: GuestEntity;

  @IsNotEmpty()
  ecommerce!: EcommerceEntity;

  @IsNotEmpty()
  orders!: {
    quantity: number;
    product: ProductEcommerceEntity;
  };
}
