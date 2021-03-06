import { EmployerEntity } from './employer.entity';
import { ZoneEntity } from './zone.entity';
import { RoomEntity } from './room.entity';
import { GuestEntity } from './guest.entity';
import { WakeUpEntity } from './wake-up.entity';
import { RequestEntity } from './request.entity';
import { ZoneReserveEntity } from './zone-reserve.entity';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';
import { RestaurantEntity } from './restaurant.entity';
import { SpecialZoneHotelEntity } from './SpecialZoneHotel.entity';

export class HotelEntity {
  uid!: string;

  name!: string;

  color!: string;

  colorSecond!: string;

  colorText!: string;

  colorTextSecond!: string;

  specialZones: SpecialZoneHotelEntity[];

  logo!: string;

  city: string;

  currency: string;

  country: string;

  state: boolean;

  initialConfiguration: boolean;

  orderText: string;

  employees!: EmployerEntity[];

  zones!: ZoneEntity[];

  zonesReservation!: ZoneReserveEntity[];

  rooms!: RoomEntity[];

  guests!: GuestEntity[];

  wakeUps!: WakeUpEntity[];

  request!: RequestEntity[];

  products!: ProductEntity[];

  orders!: OrderEntity[];

  restaurants!: RestaurantEntity[];
}
