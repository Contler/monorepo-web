import { Room } from 'lib/models/room';
import { classToPlain, Transform, Type } from 'class-transformer';

export class Guest {
  static readonly REF = 'guest';

  uid!: string;

  @Transform(value => value || null, { toClassOnly: true })
  name!: string;

  @Transform(value => value || null, { toClassOnly: true })
  lastName!: string;

  @Transform(value => value || null, { toClassOnly: true })
  typeDocument!: number;

  @Transform(value => value || null, { toClassOnly: true })
  document!: string;

  @Transform(value => value || null, { toClassOnly: true })
  room: Room | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  @Type(() => Date)
  checkIn: Date | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  @Type(() => Date)
  checkOut: Date | null = null;

  serialize() {
    return classToPlain(this);
  }
}
