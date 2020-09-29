import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuestEntity } from '@contler/entity';

@Component({
  selector: 'contler-request-reception',
  templateUrl: './request-reception.component.html',
  styleUrls: ['./request-reception.component.scss'],
})
export class RequestReceptionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RequestReceptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReqModalData,
  ) {}

  ngOnInit(): void {}
}

export interface ReqModalData {
  guest: GuestEntity;
  active: boolean;
  comment: string;
  typePetition: string;
  uid: string;
  createAt: Date;
}
