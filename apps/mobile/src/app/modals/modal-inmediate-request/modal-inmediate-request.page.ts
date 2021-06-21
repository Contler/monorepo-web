import { Component, Inject, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages/messages.service';
import { GeneralService } from '../../services/general.service';
import { EmployerService } from '../../services/employer.service';
import { InmediateRequestsService } from '../../services/inmediate-requests.service';
import { EmployerEntity } from '@contler/entity';
import { AuthService } from '../../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DynamicRequestStatus, RequestMessage, RequestService } from '@contler/dynamic-services';

@Component({
  selector: 'contler-modal-inmediate-request',
  templateUrl: './modal-inmediate-request.page.html',
  styleUrls: ['./modal-inmediate-request.page.scss'],
})
export class ModalInmediateRequestPage implements OnInit {
  request: RequestMessage;
  employers: EmployerEntity[] = [];
  idSelected: string | null = null;
  isFinished: DynamicRequestStatus;
  status = DynamicRequestStatus;

  constructor(
    public generalService: GeneralService,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    private authService: AuthService,
    private requestService: RequestService,
    public dialogRef: MatDialogRef<ModalInmediateRequestPage>,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: RequestMessage,
  ) {
    this.request = data;
  }

  ngOnInit() {
    this.idSelected = this.request.assigned?.uid;
    this.isFinished = this.request.status;
    this.employerService
      .getEmployers()
      .pipe(
        map((employers) =>
          employers.filter((employer) =>
            employer.leaderZones.find((zone) => zone.uid === this.data.zone.uid),
          ),
        ),
      )
      .subscribe((employers) => (this.employers = employers));
  }

  save() {
    const loader = this.messagesService.showLoader();
    const employer = this.employers.find((e) => e.uid === this.idSelected);
    this.requestService
      .changeStatus(this.request.key, this.isFinished, employer)
      .then(() => {
        this.messagesService.closeLoader(loader);
        const msg = this.translate.instant('immediateRequest.updateMsg');
        this.messagesService.showToastMessage(msg);
        this.dialogRef.close();
      })
      .catch((err) => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
        console.error(err);
      });
  }
}
