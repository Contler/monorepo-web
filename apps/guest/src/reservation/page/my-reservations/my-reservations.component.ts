import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../../services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { BookingEntity, HotelEntity } from '@contler/entity';
import { RESERVATION_CONSTANTS } from './my-reservations.constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {
  FilterListComponent,
  FilterListData,
} from '../../../common-components/filter-list/filter-list.component';

@Component({
  selector: 'contler-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
})
export class MyReservationsComponent implements OnInit {
  private hotel: HotelEntity | null = null;

  bookings: BookingEntity[] = [];
  constants = RESERVATION_CONSTANTS;
  isComplete = false;
  bookingComplete: BookingEntity[];
  zones: FilterListData<number | string>[];
  select: number | string = this.constants.all;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private reservationService: ReservationService,
    private bottomSheet: MatBottomSheet,
  ) {
    this.guestService.$hotel
      .pipe(
        take(1),
        tap((hotel) => (this.hotel = hotel)),
        switchMap((hotel) => this.reservationService.getZoneReservation(hotel.uid)),
      )
      .subscribe((zone) => {
        this.zones = zone.map((z) => ({ select: false, value: z.id, name: z.name }));
        this.zones.push({ select: true, value: this.constants.all, name: this.constants.all });
      });

    this.guestService.$guest
      .pipe(
        take(1),
        switchMap((data) => this.reservationService.getBookingByGuest(data!.uid)),
      )
      .subscribe((data) => {
        this.bookings = data.filter((d) => d.active);
        this.bookingComplete = data.filter((d) => !d.active);
      });
  }

  ngOnInit() {}

  openFilter() {
    this.bottomSheet
      .open(FilterListComponent, {
        data: {
          title: this.constants.filter,
          list: this.zones,
        },
        panelClass: 'bottom-custom',
      })
      .afterDismissed()
      .pipe(filter((data) => !!data))
      .subscribe((data) => {
        this.zones = data;
      });
  }
}
