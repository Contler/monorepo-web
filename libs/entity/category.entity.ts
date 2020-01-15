import { ZoneEntity } from './zone.entity';

export class CategoryEntity {
  id!: number;

  name!: string;

  zones!: ZoneEntity[];
}
