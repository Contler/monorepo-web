import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicRequest, DynamicRequestStatus } from '@contler/dynamic-services';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'contler-dynamicresult',
  templateUrl: './dynamic-result.component.html',
  styleUrls: ['./dynamic-result.component.scss'],
})
export class DynamicResultComponent implements OnInit {
  status: DynamicRequestStatus;

  listStatus = [
    DynamicRequestStatus.PROGRAMING,
    DynamicRequestStatus.ATTENDED,
    DynamicRequestStatus.COMPLETED,
  ];

  constructor(
    public dialogRef: MatDialogRef<DynamicResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicRequest,
    private db: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.status = this.data.status;
  }

  update() {
    this.data.status = this.status;
    if (this.data.status === DynamicRequestStatus.COMPLETED) {
      this.data.active = false;
    }
    this.db.collection('dynamicRequest').doc(this.data.key).update(this.data);
    this.dialogRef.close();
  }
}
