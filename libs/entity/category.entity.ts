import { ZoneEntity } from './zone.entity';
import { ZoneReserveEntity } from './zone-reserve.entity';

export class CategoryEntity {
  id!: number;

  name!: string;

  zones!: ZoneEntity[];

  zonesReservation!: ZoneReserveEntity[];
}
