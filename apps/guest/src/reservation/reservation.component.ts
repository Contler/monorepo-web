import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { take } from 'rxjs/operators';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'contler-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  hotel: HotelEntity | null | undefined;
  zoneReservation: ZoneReserveEntity[] = [];

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private reservationService: ReservationService,
    private router: Router,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => {
      this.hotel = hotel;
      this.reservationService
        .getHotelReservation(hotel!.uid)
        .subscribe((zone) => (this.zoneReservation = zone));
    });
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '',
    );
  }

  ngOnInit() {}

  public goToPage(item: ZoneReserveEntity): void {
    if (!item.zone.length) {
      this.router.navigate(['home', 'reservation', item.id]);
      return;
    }
    this.router.navigate(['home', 'reservation', item.id, 'sub-zone']);
    return;
  }
}
