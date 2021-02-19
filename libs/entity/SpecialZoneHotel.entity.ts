import { SpecialZoneEntity } from './SpecialZone.entity';
import { HotelEntity } from './hotel.entity';
import { EmployerEntity } from './employer.entity';

export class SpecialZoneHotelEntity {
  id!: number;

  status: boolean;

  icon: string;

  zone: SpecialZoneEntity;

  hotel: HotelEntity;

  leaders: EmployerEntity[];
}
