import { GuestEntity, HotelEntity, ZoneEntity } from '@contler/entity';
import { ProductListModel } from '@contler/models/product-list-model';
import { IsNotEmpty } from 'class-validator';

export class OrderRequest {
  @IsNotEmpty()
  hotel!: HotelEntity;

  @IsNotEmpty()
  guest!: GuestEntity;

  @IsNotEmpty()
  zone!: ZoneEntity;

  comment!: string;

  @IsNotEmpty()
  time!: string;

  @IsNotEmpty()
  productList!: ProductListModel[];
}
