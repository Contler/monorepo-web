import { Transform } from 'class-transformer';
import { ADMIN } from '@contler/core/const';
import { User } from 'lib/models/user';

export class Admin extends User{
  @Transform(value => value || ADMIN, { toClassOnly: true })
  readonly role = ADMIN;

}
