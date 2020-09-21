import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-complete-order-modal',
  templateUrl: './complete-order-modal.component.html',
  styleUrls: ['./complete-order-modal.component.scss'],
})
export class CompleteOrderModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CompleteOrderModalComponent>) {}

  ngOnInit(): void {}
}
