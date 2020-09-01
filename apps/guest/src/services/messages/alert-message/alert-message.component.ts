import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-message',
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
