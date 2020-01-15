import { HotelEntity } from './hotel.entity';
import { CategoryEntity } from '@contler/entity/category.entity';
import { EmployerEntity } from '@contler/entity/employer.entity';

export class ZoneEntity {
  uid!: string;

  name!: string;

  icon!: string;

  principal!: boolean;

  hotel!: HotelEntity;

  category!: CategoryEntity;

  leaders!: EmployerEntity[];
}
