import { Transform } from 'class-transformer';
import { CHIEF, EMPLOYER } from '@contler/const';
import { User } from '@contler/models/user';


export class Employer extends User {

  @Transform(value => value || 0, { toClassOnly: true })
  score = 0;

  @Transform(value => value || 0, { toClassOnly: true })
  timeAverage = 0;

  @Transform(value => value || 0, { toClassOnly: true })
  servicesNum = 0;

  constructor(rol: typeof EMPLOYER | typeof CHIEF) {
    super(rol);
  }
}
