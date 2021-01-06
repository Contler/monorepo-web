import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { Subscription } from 'rxjs';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'hotel/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-modal-inmediate-request',
  templateUrl: './modal-inmediate-request.component.html',
  styleUrls: ['./modal-inmediate-request.component.scss'],
})
export class ModalInmediateRequestComponent implements OnInit, OnDestroy {
  loading = false;
  idSelected: string;

  public request: RequestEntity | null = null;

  public employers: EmployerEntity[] = [];
  private subscription: Subscription | null = null;
  public isFinished = false;

  constructor(
    public dialogRef: MatDialogRef<ModalInmediateRequestComponent>,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA)
    public data: RequestEntity,
    private authService: AuthService,
    private translate: TranslateService,
  ) {
    this.idSelected = data.solved ? data.solved.uid : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.request = this.data;
    this.isFinished = this.request.complete;
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
      this.request!.solved = this.employers.find((e) => e.uid === this.idSelected)!;
      this.authService.$employer
        .pipe(
          switchMap((user) => {
            this.request!.attended = user!;
            this.request!.complete = this.isFinished;
            return this.inmediateRequestsService.updateRequest(this.request!);
          }),
        )
        .subscribe(
          () => {
            this.loading = false;
            const msg = this.translate.instant('immediateRequest.updateSusses');
            this.messagesService.showToastMessage(msg);
            this.dialogRef.close();
          },
          () => {
            this.loading = false;
            this.messagesService.showServerError();
            console.error('Hubo un error');
          },
        );
    }
  }
}
