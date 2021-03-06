import { Component, OnInit } from '@angular/core';
import { ProductService, ReservationService, SpecialZoneGuestService } from '@contler/core';
import { GuestService } from 'guest/services/guest.service';
import { Observable } from 'rxjs';
import { GuestEntity } from '@contler/entity';
import { SpecialZoneGuest } from '@contler/models';
import { filter, first, map, switchMap, take } from 'rxjs/operators';
import { WELCOME_CONSTANTS } from './welcome.constants';
import { ModalOrdersQuialifyComponent } from 'guest/home/components/modal-orders-quialify/modal-orders-quialify.component';
import { ModalBookingQualifyComponent } from 'guest/home/components/modal-booking-qualify/modal-booking-qualify.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalQualifyComponent } from 'guest/home/components/modal-qualify/modal-qualify.component';
import { RequestService } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';

@Component({
  selector: 'contler-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  $guest: Observable<GuestEntity | null>;
  zones$: Observable<SpecialZoneGuest[]>;
  constants = WELCOME_CONSTANTS;

  constructor(
    private guestService: GuestService,
    private reservationService: ReservationService,
    private productService: ProductService,
    private requestService: RequestService,
    private dialog: MatDialog,
    private specialZoneGuestService: SpecialZoneGuestService,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.$guest = this.store.pipe(selectUserState).pipe(map((data) => data.user));
    this.zones$ = this.store
      .pipe(selectUserState)
      .pipe(map((data) => data.hotel))
      .pipe(switchMap((hotel) => this.specialZoneGuestService.getSpecialZoneGuestActive(hotel.uid)));
    this.qualifyOrders();
    this.qualifyReservation();
    this.qualifyRequest();
  }

  qualifyRequest() {
    this.$guest
      .pipe(
        first(),
        switchMap((user) =>
          this.requestService
            .requestRef((q) =>
              q.where('active', '==', false).where('guestId', '==', user.uid).where('score', '==', null),
            )
            .valueChanges()
            .pipe(first()),
        ),
      )
      .subscribe((requests) => {
        if (requests && requests.length > 0) {
          requests.forEach((request) => {
            this.dialog.open(ModalQualifyComponent, {
              width: '342px',
              panelClass: 'cot-dialog',
              data: request,
              disableClose: true,
            });
          });
        }
      });
  }

  qualifyOrders() {
    this.$guest
      .pipe(
        take(1),
        switchMap((guest) => this.productService.getOrderByGuest(guest!.uid)),
        map((orders) => orders.filter((order) => order.state === 2 && order.qualification == null)),
        filter((data) => data.length > 0),
      )
      .subscribe((data) => {
        data.forEach((item) => {
          this.dialog.open(ModalOrdersQuialifyComponent, {
            width: '342px',
            panelClass: 'cot-dialog',
            data: item,
            disableClose: true,
          });
        });
      });
  }

  qualifyReservation() {
    this.$guest
      .pipe(
        switchMap((guest) => this.reservationService.getBookingByGuest(guest!.uid)),
        map((booking) =>
          booking.filter(
            (book) =>
              book.complete && new Date(book.date).getTime() < Date.now() && book.qualification == null,
          ),
        ),
      )
      .subscribe((data) => {
        if (data && data.length) {
          data.forEach((booking) => {
            this.dialog.open(ModalBookingQualifyComponent, {
              width: '342px',
              panelClass: 'cot-dialog',
              data: booking,
              disableClose: true,
            });
          });
        }
      });
  }
}
