import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, buttonText: string, icon: string }) { }

  ngOnInit() {
  }

  close() {

    this.dialogRef.close();
  }
}
