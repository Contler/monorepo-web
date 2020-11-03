import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookingEntity, EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { filter, map, switchMap } from 'rxjs/operators';
import { ReservationService } from '@contler/core';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contler-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnDestroy {
  user: EmployerEntity | null = null;
  search = '';
  booking: BookingEntity[] = [];

  readonly PAGES = {
    PENDING: '/home/booking/pending',
    READY: '/home/booking/ready',
  };
  currentPage: string | undefined;
  private routerSubscription: Subscription | undefined;

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private reservationService: ReservationService,
    public generalService: GeneralService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.auth.$user.subscribe((user) => (this.user = user));
    this.auth.$user
      .pipe(
        switchMap((user) => this.reservationService.getBookingByHotel(user!.hotel.uid)),
        map((booking) => booking.filter((book) => book.active && !book.complete)),
      )
      .subscribe((booking) => (this.booking = booking));
  }

  ionViewWillEnter() {
    this.currentPage = this.router.url;
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((data) => (this.currentPage = (data as NavigationEnd).url));
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ionViewWillLeave() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  cancel(booking: BookingEntity) {
    this.dialog
      .open(ModalConfirmComponent)
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        switchMap(() => this.reservationService.cancelBooking(booking)),
      )
      .subscribe(() => {
        this.booking = this.booking.filter((b) => b.id !== booking.id);
      });
  }

  complete(booking: BookingEntity) {
    this.reservationService.completeBooking(booking).subscribe(() => {
      this.booking = this.booking.filter((b) => b.id !== booking.id);
    });
  }
}
