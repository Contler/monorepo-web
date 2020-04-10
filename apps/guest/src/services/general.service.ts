import { Injectable } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { take } from 'rxjs/operators';
import { HotelEntity } from '@contler/entity';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private hotel: HotelEntity | null | undefined;

  constructor(guest: GuestService, private sanitizer: DomSanitizer) {
    guest.$hotel.pipe(take(1)).subscribe(hotel => (this.hotel = hotel));
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '',
    );
  }

  getSecondColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.colorSecond
        ? `color: ${this.hotel.colorSecond}`
        : '',
    );
  }

  getStringColorHotel() {
    return this.hotel ? this.hotel.color : ''
  }

  getColorButtonHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color
        ? `background: ${this.hotel.color};  color: #ffffff !important`
        : '',
    );
  }
}
