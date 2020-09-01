import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RequestService } from 'guest/services/request.service';
import { RequestEntity } from '@contler/entity';

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

  constructor(
    private dialogRef: MatDialogRef<ModalQualifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestEntity,
    private requestService: RequestService,
  ) {}

  ngOnInit() {}

  selectStart(value: any) {
    this.value = value.newValue;
  }

  close() {
    this.load = true;
    this.data.comment = this.comment || '';
    this.data.score = this.value!;
    this.requestService.updateRequest(this.data).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
