import { Component, OnInit } from '@angular/core';
import { ReservationService } from '@contler/core';
import { BookingEntity, EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'contler-ready-booking',
  templateUrl: './ready-booking.component.html',
  styleUrls: ['./ready-booking.component.scss'],
})
export class ReadyBookingComponent implements OnInit {
  user: EmployerEntity | null = null;
  search = '';
  booking: BookingEntity[] = [];

  constructor(
    private auth: AuthService,
    public menu: MenuController,
    private reservationService: ReservationService,
  ) {}

  ngOnInit() {
    this.auth.$user.subscribe((user) => (this.user = user));
    this.auth.$user
      .pipe(switchMap((user) => this.reservationService.getBookingByHotel(user!.hotel.uid)))
      .subscribe((booking) => (this.booking = booking));
  }
}
