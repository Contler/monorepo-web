import { Component, OnInit } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { GuestEntity, HotelEntity, ScheduleEntity } from '@contler/entity';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DAYS } from '@contler/const';

@Component({
  selector: 'contler-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.scss'],
})
export class CreateReservationComponent implements OnInit {
  private guest: GuestEntity | null = null;
  private days = DAYS;
  hotel: HotelEntity | null | undefined;
  zoneReservation: ZoneReserveEntity | undefined;
  reservationForm: FormGroup;
  loader = false;
  schedule: ScheduleEntity[] = [];

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    formBuild: FormBuilder,
  ) {
    this.reservationForm = formBuild.group({
      date: ['', Validators.required],
      quota: ['', Validators.required],
      name: ['', Validators.required],
      schedule: ['', Validators.required],
    });
    this.guestService.$hotel.pipe(take(1)).subscribe(hotel => (this.hotel = hotel));
    this.guestService.$guest
      .pipe(tap(guest => this.nameReservation.setValue(guest!.name + ' ' + guest!.lastName)))
      .subscribe(guest => (this.guest = guest));
    this.route.params
      .pipe(
        map(data => data['id']),
        switchMap(id => this.reservationService.getReservation(id)),
      )
      .subscribe(data => {
        this.zoneReservation = data;
      });
  }

  ngOnInit() {
    this.dateReservation.valueChanges.subscribe((date: Date) => {
      const day = this.days[date.getDay()]
      this.schedule = this.zoneReservation!.schedule.filter(s => s.day === day && s.active)
  })
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  get nameReservation() {
    return this.reservationForm.get('name')!;
  }

  get dateReservation() {
    return this.reservationForm.get('date')!;
  }
}
