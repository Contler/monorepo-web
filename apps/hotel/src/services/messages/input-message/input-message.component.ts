import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.scss']
})
export class InputMessageComponent implements OnInit {
  public value: any;

  constructor(public dialogRef: MatDialogRef<InputMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { placeholder: string, type: string, required: boolean }) { }

  ngOnInit() {
  }

  save() {

    this.dialogRef.close(this.value);
  }

  close() {

    this.dialogRef.close(null);
  }

}
