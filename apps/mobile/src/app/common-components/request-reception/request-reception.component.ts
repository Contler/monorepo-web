import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as Dynamic } from '@contler/dynamic-translate';
import { RECEPTION_STATUS } from '@contler/const';
import { ReceptionStatus } from '../../../../../../libs/models';

@Component({
  selector: 'contler-request-reception',
  templateUrl: './request-reception.component.html',
  styleUrls: ['./request-reception.component.scss'],
})
export class RequestReceptionComponent {
  readonly receptionStatus = RECEPTION_STATUS;
  comment: string;

  constructor(
    public dialogRef: MatDialogRef<RequestReceptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReqModalData,
    private translate: TranslateService,
    private dynamic: Dynamic,
  ) {
    switch (data.typePetition) {
      case 'Cleaning':
        const splitMsn = data.comment.split(' - ');
        splitMsn.forEach((key, i) => {
          const staticTranslate = this.translate.instant(key);
          splitMsn[i] = this.dynamic.getInstant(staticTranslate);
        });
        this.comment = splitMsn.join(' - ');
        break;
      default:
        this.comment = data.comment;
    }
  }

  update() {
    this.dialogRef.close({ status: this.data.status });
  }
}

export interface ReqModalData {
  guest: GuestEntity;
  active: boolean;
  comment: string;
  typePetition: string;
  uid: string;
  createAt: Date;
  status: ReceptionStatus;
}
