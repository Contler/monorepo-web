import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';

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
  ) {
    switch (data.typePetition) {
      case 'Cleaning':
        const splitMsn = data.comment.split(' - ');
        splitMsn[0] = this.translate.instant(splitMsn[0]);
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
