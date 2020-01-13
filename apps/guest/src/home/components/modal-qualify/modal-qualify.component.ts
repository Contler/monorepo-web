import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Request } from '@contler/models';
import { RequestService } from 'guest/services/request.service';

@Component({
  selector: 'contler-modal-qualify',
  templateUrl: './modal-qualify.component.html',
  styleUrls: ['./modal-qualify.component.scss'],
})
export class ModalQualifyComponent implements OnInit {
  value: number | undefined;
  comment: string | undefined;
  load = false;
  readonly textRate = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Exelente'];
  public request: Request;

  constructor(
    private dialogRef: MatDialogRef<ModalQualifyComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Request,
    private requestService: RequestService,
  ) {
    this.request = Object.assign({}, data);
  }

  ngOnInit() {}

  selectStart(value: any) {
    this.value = value.newValue;
  }

  close() {
    this.load = true;
    this.data.scoreComments = this.comment;
    this.data.score = this.value;
    this.requestService.updateRequest(this.data).then(_ => {
      this.dialogRef.close();
    });
  }
}
