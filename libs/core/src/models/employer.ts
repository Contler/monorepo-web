import { Transform } from 'class-transformer';

import { User } from 'lib/models/user';
import { CHIEF, EMPLOYER } from 'lib/const';

export class Employer extends User {

  @Transform(value => value || 0, { toClassOnly: true })
  score = 0;

  constructor(rol: typeof EMPLOYER | typeof CHIEF) {
    super(rol);
  }
}
