import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceptionModel } from '@contler/models';
import { Observable } from 'rxjs';
import { GuestEntity } from '@contler/entity';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs/operators';
import { ReqModalData, RequestReceptionComponent } from '../request-reception/request-reception.component';

@Component({
  selector: 'contler-reception-item',
  templateUrl: './reception-item.component.html',
  styleUrls: ['./reception-item.component.scss'],
})
export class ReceptionItemComponent implements AfterViewInit {
  @Input() reception: ReceptionModel;
  @Output() closeModal = new EventEmitter<boolean>();

  $guest: Observable<GuestEntity>;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.$guest = this.authService.getUserById(this.reception.guest).pipe(take(1));
  }

  goToModal() {
    const { active, comment, createAt, uid, type } = this.reception;
    this.openModal(active, comment, type, uid, createAt).subscribe(async ({ complete }) => {
      this.closeModal.emit(complete);
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
