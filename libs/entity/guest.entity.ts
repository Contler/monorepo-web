import { HotelEntity } from './hotel.entity';
import { RoomEntity } from './room.entity';
import { WakeUpEntity } from './wake-up.entity';
import { RequestEntity } from './request.entity';
import { BookingEntity } from './booking.entity';
import { OrderEntity } from './order.entity';

export class GuestEntity {
  uid!: string;

  active!: boolean;

  name!: string;

  lastName!: string;

  email!: string;

  typeDocument!: number;

  document!: string;

  checkIn!: Date;

  checkOut!: Date;

  hotel!: HotelEntity;

  room!: RoomEntity;

  wakeUps!: WakeUpEntity[];

  request!: RequestEntity[];

  booking!: BookingEntity[];

  orders!: OrderEntity[];

  partner!: GuestEntity;
}
