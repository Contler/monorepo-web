import { Component, Inject, OnInit } from '@angular/core';
import { BookingEntity } from '@contler/entity';
import { ReservationService } from '@contler/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TEXT_RATE } from '../const/qualify.const';

@Component({
  selector: 'contler-modal-booking-qualify',
  templateUrl: './modal-booking-qualify.component.html',
  styleUrls: ['./modal-booking-qualify.component.scss'],
})
export class ModalBookingQualifyComponent implements OnInit {
  value: number | undefined;
  readonly textRate = TEXT_RATE;
  load = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookingEntity,
    private dialogRef: MatDialogRef<ModalBookingQualifyComponent>,
    private reservationService: ReservationService,
  ) {}

  ngOnInit() {}

  selectStart(value: any) {
    this.value = value.newValue;
  }

  close() {
    this.load = true;
    this.reservationService.qualifyBooking(this.data.id, this.value!).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
