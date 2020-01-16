import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WakeUpEntity } from '@contler/entity';
import { WakeService } from '../../../services/wake.service';

@Component({
  selector: 'contler-modal-confirm-wake',
  templateUrl: './modal-confirm-wake.component.html',
  styleUrls: ['./modal-confirm-wake.component.scss'],
})
export class ModalConfirmWakeComponent implements OnInit {
  load = false;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmWakeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WakeUpEntity,
    private wakeService: WakeService,
  ) {}

  ngOnInit() {}

  complete() {
    this.load = true;
    this.wakeService.completeWake(this.data.id).subscribe(() => this.dialogRef.close(true));
  }
}
