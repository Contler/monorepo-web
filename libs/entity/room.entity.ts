import { HotelEntity } from './hotel.entity';
import { GuestEntity } from './guest.entity';
import { WakeUpEntity } from './wake-up.entity';
import { RequestEntity } from './request.entity';
import { HotelBookingEntity } from './hotel-booking.entity';

export class RoomEntity {
  uid!: string;

  name!: string;

  number!: number;

  hotel!: HotelEntity;

  wakeUps!: WakeUpEntity[];

  request!: RequestEntity[];

  hotelBooking: HotelBookingEntity[];
}
