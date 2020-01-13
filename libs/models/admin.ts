import { ADMIN } from '@contler/const';
import { User } from '@contler/models/user';

export class Admin extends User{
  constructor() {
    super(ADMIN)
  }

}
