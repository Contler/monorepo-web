import { classToPlain, Transform } from 'class-transformer';


export class Hotel {
  static readonly REF = 'hotel';

  @Transform(value => value || null, { toClassOnly: true })
  name: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  logo: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  uid: string | null = null;

  @Transform(value => value || null, { toClassOnly: true })
  color: string | null = null;

  serialize() {
    return classToPlain(this)
  }
}


