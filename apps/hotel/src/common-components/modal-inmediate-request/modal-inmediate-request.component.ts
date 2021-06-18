import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { EmployerService } from '../../employer/services/employer.service';
import { InmediateRequestsService } from '../../inmediate-requests/services/inmediate-requests.service';
import { MessagesService } from '../../services/messages/messages.service';
import { AuthService } from '../../services/auth.service';
import { DynamicRequestStatus, RequestMessage, RequestService } from '@contler/dynamic-services';

@Component({
  selector: 'contler-modal-inmediate-request',
  templateUrl: './modal-inmediate-request.component.html',
  styleUrls: ['./modal-inmediate-request.component.scss'],
})
export class ModalInmediateRequestComponent implements OnInit, OnDestroy {
  readonly status = DynamicRequestStatus;

  loading = false;
  idSelected: string;

  public request: RequestMessage;

  public employers: EmployerEntity[] = [];
  private subscription: Subscription | null = null;
  public isFinished: DynamicRequestStatus = DynamicRequestStatus.PROGRAMING;

  constructor(
    public dialogRef: MatDialogRef<ModalInmediateRequestComponent>,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA)
    public data: RequestMessage,
    private authService: AuthService,
    private translate: TranslateService,
    private requestService: RequestService,
  ) {
    this.idSelected = data.assigned ? data.assigned.uid : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.request = this.data;
    this.isFinished = this.request.status;
    this.subscription = this.employerService
      .getEmployers()
      .subscribe((employers) => (this.employers = employers));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    if (this.request) {
      this.loading = true;
      const { leaderZones, leaderSpecialZone, averageTime, hotel, ...employer } = this.employers.find(
        (e) => e.uid === this.idSelected,
      )!;
      this.requestService
        .requestRef()
        .doc(this.request.key)
        .update({
          assigned: employer as EmployerEntity,
          assignedId: employer.uid,
          status: this.isFinished,
        })
        .then(() => {
          this.loading = false;
          const msg = this.translate.instant('immediateRequest.updateSusses');
          this.messagesService.showToastMessage(msg);
          this.dialogRef.close();
        })
        .catch(() => {
          this.loading = false;
          this.messagesService.showServerError();
          console.error('Hubo un error');
        });
    }
  }
}
