import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';

@Component({
  selector: 'contler-modal-complete',
  templateUrl: './modal-complete.component.html',
  styleUrls: ['./modal-complete.component.scss'],
})
export class ModalCompleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public config: ModalConfigModel,
    public dialogRef: MatDialogRef<ModalCompleteComponent>,
  ) {}
}
