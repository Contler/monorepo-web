import { classToPlain, Transform } from 'class-transformer';

export class User {
  static readonly REF = 'user';

  @Transform(value => value || null, { toClassOnly: true })
  hotel: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  uid: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  name: string | null = null;

  serialize() {
    return classToPlain(this)
  }
}
