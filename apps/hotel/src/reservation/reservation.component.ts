import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationRequest } from '@contler/models';
import { ReservationService } from '@contler/core';
import { ReservationFormComponent } from 'hotel/reservation/components/reservation-form/reservation-form.component';
import { AuthService } from 'hotel/services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { HotelEntity } from '@contler/entity';
import { SubZoneReservationFormComponent } from 'hotel/reservation/components/sub-zone-reservation-form/sub-zone-reservation-form.component';

@Component({
  selector: 'contler-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  @ViewChild(ReservationFormComponent, { static: false }) private reservationForm!: ReservationFormComponent;
  @ViewChild(SubZoneReservationFormComponent, { static: false })
  private subZoneReservationForm!: SubZoneReservationFormComponent;
  load = false;
  zoneReservations: ZoneReserveEntity[] = [];

  private hotel: HotelEntity | undefined;
  public showSubZoneForm = false;

  constructor(private reservationService: ReservationService, private auth: AuthService) {
    this.auth.$employer
      .pipe(
        tap((user) => (this.hotel = user.hotel)),
        switchMap((employer) => reservationService.getHotelReservation(employer.hotel.uid)),
      )
      .subscribe((zoneReservations) => (this.zoneReservations = zoneReservations));
  }

  createReservation(request: ReservationRequest) {
    this.load = true;
    request.hotel = this.hotel!;
    this.reservationService.createReservation(request).subscribe((data) => {
      data.schedule = [];
      this.reservationForm.reset();
      this.load = false;
      this.zoneReservations = [...this.zoneReservations, data];
    });
  }

  ngOnInit() {}

  createSubZoneReservation(request: ReservationRequest): void {
    this.load = true;
    request.hotel = this.hotel!;
    this.reservationService.createReservation(request).subscribe((data) => {
      data.schedule = [];
      this.subZoneReservationForm.reset();
      this.load = false;
      this.zoneReservations = this.zoneReservations.map((z) => {
        if (z.id === data.zoneParent.id) {
          z.subZone = [...z.subZone, data];
          return z;
        }
        return z;
      });
    });
  }
}
