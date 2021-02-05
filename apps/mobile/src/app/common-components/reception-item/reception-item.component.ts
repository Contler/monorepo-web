import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReceptionModel, ReceptionStatus } from '@contler/models';
import { Observable } from 'rxjs';
import { GuestEntity } from '@contler/entity';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs/operators';
import { ReqModalData, RequestReceptionComponent } from '../request-reception/request-reception.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as Dynamic } from '@contler/dynamic-translate';

@Component({
  selector: 'contler-reception-item',
  templateUrl: './reception-item.component.html',
  styleUrls: ['./reception-item.component.scss'],
})
export class ReceptionItemComponent implements AfterViewInit {
  @Input() reception: ReceptionModel;
  @Input() isReady: boolean;
  @Output() closeModal = new EventEmitter<ReceptionStatus>();

  $guest: Observable<GuestEntity>;
  comment: string[] = [];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private dynamic: Dynamic,
  ) {}

  ngAfterViewInit(): void {
    this.$guest = this.authService.getUserById(this.reception.guest).pipe(take(1));
    this.translateComment();
  }

  translateComment() {
    const commentSplit = this.reception.comment.split(' - ');
    commentSplit.forEach(async (data, i) => {
      const staticTranslate = this.translate.instant(data);
      this.comment[i] = await this.dynamic.getTranslate(staticTranslate).toPromise();
    });
  }

  get commentData() {
    return this.comment.join(' - ');
  }

  goToModal() {
    if (this.isReady) {
      const { active, comment, createAt, uid, type, status } = this.reception;
      this.openModal(active, comment, type, uid, createAt, status).subscribe((update) => {
        this.closeModal.emit(update.status);
      });
    }
  }

  private openModal(
    active: boolean,
    comment: string,
    typePetition: string,
    uid: string,
    createAt: Date,
    status: ReceptionStatus,
  ) {
    return this.$guest.pipe(
      switchMap((guest) =>
        this.dialog
          .open<RequestReceptionComponent, ReqModalData, { status: ReceptionStatus }>(
            RequestReceptionComponent,
            {
              data: {
                active,
                comment,
                typePetition,
                uid,
                guest,
                createAt,
                status,
              },
              minWidth: '100%',
              minHeight: `${window.innerHeight}px`,
            },
          )
          .afterClosed(),
      ),
      filter((data) => !!data),
    );
  }
}
