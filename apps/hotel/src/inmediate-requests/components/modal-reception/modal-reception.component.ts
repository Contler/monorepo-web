import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReqRecpetionGuest } from '../reception-request/reception-request.component';

@Component({
  selector: 'contler-modal-reception',
  templateUrl: './modal-reception.component.html',
  styleUrls: ['./modal-reception.component.scss'],
})
export class ModalReceptionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalReceptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReqRecpetionGuest,
  ) {}

  ngOnInit(): void {}

  update() {
    this.dialogRef.close(true);
  }
}
