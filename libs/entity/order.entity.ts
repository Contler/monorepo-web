import { ProductOrderEntity } from './product-order.entity';
import { HotelEntity } from './hotel.entity';
import { GuestEntity } from './guest.entity';
import { ZoneEntity } from './zone.entity';
import { EmployerEntity } from '@contler/entity/employer.entity';

export class OrderEntity {
  id!: number;

  productsOrder!: ProductOrderEntity[];

  hotel!: HotelEntity;

  guest!: GuestEntity;

  zone!: ZoneEntity;

  comment!: string;

  time!: Date;

  state!: number;

  employer!: EmployerEntity;

  qualification!: number;

  dateComplete!: Date;

}
