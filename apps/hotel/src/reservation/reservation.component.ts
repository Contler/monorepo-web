import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationRequest } from '@contler/models';
import { ReservationService } from '@contler/core';
import { ReservationFormComponent } from 'hotel/reservation/components/reservation-form/reservation-form.component';
import { AuthService } from 'hotel/services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { HotelEntity } from '@contler/entity';

@Component({
  selector: 'contler-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  @ViewChild(ReservationFormComponent, { static: true }) private reservationForm!: ReservationFormComponent;
  load = false;
  zoneReservations: ZoneReserveEntity[] = [];

  private hotel: HotelEntity | undefined;

  constructor(private reservationService: ReservationService, private auth: AuthService) {
    this.auth.$employer
      .pipe(
        tap(user => (this.hotel = user.hotel)),
        switchMap(employer => reservationService.getHotelReservation(employer.hotel.uid)),
      )
      .subscribe(zoneReservations => (this.zoneReservations = zoneReservations));
  }

  createReservation(request: ReservationRequest) {
    this.load = true;
    request.hotel = this.hotel!;
    this.reservationService.createReservation(request).subscribe(data => {
      this.reservationForm.reset();
      this.load = false;
      this.zoneReservations = [...this.zoneReservations, data];
    });
  }

  ngOnInit() {}
}
