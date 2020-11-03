import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from '@contler/core';
import { BookingEntity, EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { map, switchMap, filter } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';

@Component({
  selector: 'contler-pending-booking',
  templateUrl: './pending-booking.component.html',
  styleUrls: ['./pending-booking.component.scss'],
})
export class PendingBookingComponent implements OnInit {
  user: EmployerEntity | null = null;
  search = '';
  booking: BookingEntity[] = [];

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private reservationService: ReservationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.auth.$user.subscribe((user) => (this.user = user));
    this.auth.$user
      .pipe(
        switchMap((user) => this.reservationService.getBookingByHotel(user!.hotel.uid)),
        map((booking) => booking.filter((book) => book.active && !book.complete)),
      )
      .subscribe((booking) => (this.booking = booking));
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
