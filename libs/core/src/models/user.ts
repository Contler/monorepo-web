import { classToPlain, Transform } from 'class-transformer';
import { ADMIN, EMPLOYER, Roles } from 'lib/const';

export class User {
  static readonly REF = 'user';

  @Transform(value => value || EMPLOYER, { toClassOnly: true })
  readonly role: Roles;

  @Transform(value => value || null, { toClassOnly: true })
  hotel: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  uid: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  name: string | null = null;

  constructor(rol: Roles) {
    this.role = rol
  }

  serialize() {
    return classToPlain(this)
  }
}
