import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-modal-remove-employer',
  templateUrl: './modal-remove-employer.component.html',
  styleUrls: ['./modal-remove-employer.component.scss']
})
export class ModalRemoveEmployerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalRemoveEmployerComponent>,
  ) { }

  ngOnInit() {
  }


}
