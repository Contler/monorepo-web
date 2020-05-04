import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BookingEntity, EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { filter, switchMap } from 'rxjs/operators';
import { ReservationService } from '@contler/core';
import { MatDialog } from '@angular/material';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'contler-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  user: EmployerEntity | null = null;
  search = '';
  booking: BookingEntity[] = [];

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private reservationService: ReservationService,
    private dialog: MatDialog,
    public generalService: GeneralService
  ) {
    this.auth.$user.subscribe(user => (this.user = user));
    this.auth.$user
      .pipe(switchMap(user => this.reservationService.getBookingByHotel(user!.hotel.uid)))
      .subscribe(booking => (this.booking = booking));
  }

  ngOnInit() {}

  cancel(booking: BookingEntity) {
    this.dialog
      .open(ModalConfirmComponent)
      .afterClosed()
      .pipe(
        filter(data => !!data),
        switchMap(() => this.reservationService.cancelBooking(booking)),
      )
      .subscribe(() => {
        this.booking = this.booking.filter(b => b.id !== booking.id);
      });
  }

  complete(booking: BookingEntity) {
    this.reservationService.completeBooking(booking).subscribe(() => {
      this.booking = this.booking.filter(b => b.id !== booking.id);
    });
  }
}