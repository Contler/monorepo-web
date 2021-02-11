import { Component, OnInit } from '@angular/core';
import { HotelEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SubZoneReserveEntity } from '@contler/entity/sub-zone-reserve.entity';

@Component({
  selector: 'contler-sub-zone-reservation',
  templateUrl: './sub-zone-reservation.component.html',
  styleUrls: ['./sub-zone-reservation.component.scss'],
})
export class SubZoneReservationComponent implements OnInit {
  hotel: HotelEntity | null | undefined;
  subZoneReservation: SubZoneReserveEntity[] = [];

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  public async ngOnInit() {
    this.hotel = await this.guestService.$hotel.pipe(first()).toPromise();
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('idZone')),
        filter((id) => !!id),
        map((id) => parseInt(id, 0)),
        switchMap((id) => this.reservationService.getReservation(id)),
      )
      .subscribe(
        (reservation) => {
          this.subZoneReservation = reservation.zone;
        },
        (err) => {
          this.router.navigate(['home']);
        },
      );
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '',
    );
  }
}
