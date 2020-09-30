import { AfterViewInit, Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GuestEntity } from '@contler/entity';
import { ReceptionModel } from '@contler/models';
import { filter, switchMap, take } from 'rxjs/operators';
import {
  ReqModalData,
  RequestReceptionComponent,
} from '../../modals/request-reception/request-reception.component';
import { ReceptionService } from '../../../../../../../libs/core/src';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'contler-reception-item',
  templateUrl: './reception-item.component.html',
  styleUrls: ['./reception-item.component.scss'],
})
export class ReceptionItemComponent implements AfterViewInit {
  @Input() reception: ReceptionModel;
  $guest: Observable<GuestEntity>;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private receptionService: ReceptionService,
    private snackBar: MatSnackBar,
  ) {}

  ngAfterViewInit(): void {
    this.$guest = this.authService.getUserById(this.reception.guest).pipe(take(1));
  }

  goToModal() {
    const { active, comment, createAt, uid, type } = this.reception;
    this.openModal(active, comment, type, uid, createAt).subscribe(async ({ complete }) => {
      await this.receptionService.receptionRef.doc(uid).update({ active: complete });
      this.snackBar.open('Petición actualizada', 'cerrar', { duration: 3000 });
    });
  }

  private openModal(active: boolean, comment: string, typePetition: string, uid: string, createAt: Date) {
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
