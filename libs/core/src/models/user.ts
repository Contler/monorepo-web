import { classToPlain, Transform } from 'class-transformer';
import { EMPLOYER, Roles } from '@contler/core/const';

export class User {
  static readonly REF = 'user';

  @Transform(value => value || EMPLOYER, { toClassOnly: true })
  role: Roles;

  @Transform(value => value || null, { toClassOnly: true })
  hotel: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  uid: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  name: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  lastName: string | null = null;

  @Transform(value => value || {}, { toClassOnly: true })
  leaderZone: { [key: string]: boolean } = {};

  constructor(rol: Roles) {
    this.role = rol;
  }

  serialize() {
    return classToPlain(this);
  }
}
