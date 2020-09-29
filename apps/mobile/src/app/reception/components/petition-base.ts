import { MatDialog } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';

import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  ReqModalData,
  RequestReceptionComponent,
} from '../modals/request-reception/request-reception.component';

export class PetitionBase {
  $guest: Observable<GuestEntity>;
  constructor(private authService: AuthService, private dialog: MatDialog) {}

  protected loadGuest(uid: string) {
    this.$guest = this.authService.getUserById(uid);
  }

  protected openModal(active: boolean, comment: string, typePetition: string, uid: string, createAt: Date) {
    return this.$guest.pipe(
      switchMap((guest) =>
        this.dialog
          .open<RequestReceptionComponent, ReqModalData, { complete: boolean }>(RequestReceptionComponent, {
            data: {
              active,
              comment,
              typePetition,
              uid,
              guest,
              createAt,
            },
            minWidth: '100%',
            minHeight: `${window.innerHeight}px`,
          })
          .afterClosed(),
      ),
      filter((data) => !!data),
    );
  }
}
