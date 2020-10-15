import { Component, OnInit } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { switchMap, take } from 'rxjs/operators';
import { BookingEntity, HotelEntity } from '@contler/entity';

@Component({
  selector: 'contler-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
})
export class MyReservationsComponent implements OnInit {
  private hotel: HotelEntity | null = null;

  bookings: BookingEntity[] = [];

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private reservationService: ReservationService,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    this.guestService.$guest
      .pipe(
        take(1),
        switchMap((data) => this.reservationService.getBookingByGuest(data!.uid)),
      )
      .subscribe((data) => {
        this.bookings = data;
      });
  }

  ngOnInit() {}
  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '',
    );
  }

  getColorSecondHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.colorSecond ? `color: ${this.hotel.colorSecond}` : '',
    );
  }
}
