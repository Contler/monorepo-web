import { ADMIN } from '@contler/core/const';
import { User } from 'lib/models/user';

export class Admin extends User{
  constructor() {
    super(ADMIN)
  }

}
