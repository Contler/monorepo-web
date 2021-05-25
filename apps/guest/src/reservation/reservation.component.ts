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

  ngOnInit() {}

  public getLink(item: ZoneReserveEntity) {
    if (!item.subZone.length) {
      return `/home/reservation/${item.id}`;
    } else {
      return `/home/reservation/${item.id}/sub-zone`;
    }
  }
}
