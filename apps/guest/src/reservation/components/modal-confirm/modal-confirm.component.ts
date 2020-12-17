import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GuestService } from 'guest/services/guest.service';
import { HotelEntity } from '@contler/entity';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
})
export class ModalConfirmComponent implements OnInit {
  hotel: HotelEntity | null | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmComponent>,
    private sanitizer: DomSanitizer,
    private guestService: GuestService,
  ) {
    this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
  }

  ngOnInit() {}

  getColorButtonHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `background: ${this.hotel.color};  color: #ffffff !important` : '',
    );
  }

  getColorSecondHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.colorSecond}` : '',
    );
  }
}
