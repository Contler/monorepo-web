import { AuthService } from '../../services/auth.service';
import { GuestEntity } from '@contler/entity';
import { Observable } from 'rxjs';

export class PetitionBase {
  $guest: Observable<GuestEntity>;
  constructor(private authService: AuthService) {}

  protected loadGuest(uid: string) {
    this.$guest = this.authService.getUserById(uid);
  }
}
