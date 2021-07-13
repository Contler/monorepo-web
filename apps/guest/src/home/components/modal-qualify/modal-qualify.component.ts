import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TEXT_RATE } from '../const/qualify.const';
import { AbstractRequest, RequestService } from '@contler/dynamic-services';

@Component({
  selector: 'contler-modal-qualify',
  templateUrl: './modal-qualify.component.html',
  styleUrls: ['./modal-qualify.component.scss'],
})
export class ModalQualifyComponent implements OnInit {
  value: number | undefined;
  comment: string | undefined;
  load = false;
  readonly textRate = TEXT_RATE;

  constructor(
    private dialogRef: MatDialogRef<ModalQualifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AbstractRequest,
    private requestService: RequestService,
  ) {}

  ngOnInit() {}

  selectStart(value: any) {
    this.value = value.newValue;
  }

  close() {
    this.load = true;
    this.requestService.qualifyRequest(this.data, this.value, this.comment).then(() => {
      this.dialogRef.close();
    });
  }

  get nameService() {
    return this.requestService.getNameService(this.data);
  }
}
