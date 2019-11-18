import { classToPlain, Transform } from 'class-transformer';
import { ADMIN } from '@contler/core/const';

export class Admin {
  static readonly REF = 'user';

  @Transform(value => value || ADMIN, { toClassOnly: true })
  readonly role = ADMIN;

  @Transform(value => value || null, { toClassOnly: true })
  uid: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  name: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  hotel: string | null = null;

  serialize() {
    return classToPlain(this)
  }
}
