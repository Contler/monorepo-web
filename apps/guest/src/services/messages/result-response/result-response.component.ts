import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-result-response',
  templateUrl: './result-response.component.html',
  styleUrls: ['./result-response.component.scss'],
})
export class ResultResponseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ResultResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; type: string; icon: string },
  ) {}

  ngOnInit() {}
}
