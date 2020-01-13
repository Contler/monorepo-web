import { classToPlain, Transform } from 'class-transformer';
import { GUEST } from '@contler/const';
import { Room } from '@contler/models/room';

export class Guest {
  static readonly REF = 'guest';

  readonly role = GUEST;

  uid!: string;

  active!: boolean;

  @Transform(value => value || null, { toClassOnly: true })
  name!: string;

  @Transform(value => value || null, { toClassOnly: true })
  lastName!: string;

  typeDocument!: number;

  @Transform(value => value || null, { toClassOnly: true })
  document!: string;

  @Transform(value => value || null, { toClassOnly: true })
  room: Room | null = null;

  @Transform(value => value.toString(), {toPlainOnly: true})
  @Transform(value => new Date(value), {toClassOnly: true})
  checkIn: Date | null = null;

  @Transform(value => value.toString(), {toPlainOnly: true})
  @Transform(value => new Date(value), {toClassOnly: true})
  checkOut: Date | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  hotel!: string;

  serialize() {
    return classToPlain(this);
  }
}
