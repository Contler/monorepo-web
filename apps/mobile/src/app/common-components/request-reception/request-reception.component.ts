import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';
import { TranslateService as Dynamic } from '@contler/dynamic-translate';

@Component({
  selector: 'contler-request-reception',
  templateUrl: './request-reception.component.html',
  styleUrls: ['./request-reception.component.scss'],
})
export class RequestReceptionComponent {
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
    this.dialogRef.close({ complete: this.data.active });
  }
}

export interface ReqModalData {
  guest: GuestEntity;
  active: boolean;
  comment: string;
  typePetition: string;
  uid: string;
  createAt: Date;
}
