import { Component, OnInit } from '@angular/core';
import { GuestEntity, HotelEntity, ScheduleEntity } from '@contler/entity';
import { DAYS, TYPE_ERROR } from '@contler/const';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '@contler/core';
import { MessagesService } from 'guest/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { BookingRequest } from '@contler/models/booking-request';
import { forkJoin } from 'rxjs';
import { SubZoneReserveEntity } from '@contler/entity/sub-zone-reserve.entity';

@Component({
  selector: 'contler-create-sub-zone-reservation',
  templateUrl: './create-sub-zone-reservation.component.html',
  styleUrls: ['./create-sub-zone-reservation.component.scss'],
})
export class CreateSubZoneReservationComponent implements OnInit {
  private guest: GuestEntity | null = null;
  private days = DAYS;
  hotel: HotelEntity | null | undefined;
  subZoneReservation: SubZoneReserveEntity | undefined;
  reservationForm: FormGroup;
  loader = false;
  schedule: ScheduleEntity[] = [];
  err = '';
  filterDate: Function;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    formBuild: FormBuilder,
    private messagesService: MessagesService,
    private translate: TranslateService,
  ) {
    this.reservationForm = formBuild.group({
      date: ['', Validators.required],
      quota: ['', Validators.required],
      name: ['', Validators.required],
      schedule: ['', Validators.required],
    });
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    this.guestService.$guest
      .pipe(tap((guest) => this.nameReservation.setValue(guest!.name + ' ' + guest!.lastName)))
      .subscribe((guest) => (this.guest = guest));
    this.route.params
      .pipe(
        map((data) => ({ idZone: data['idZone'], idSubZone: data['idSubZone'] })),
        switchMap((data) =>
          forkJoin({
            zoneReservationEntity: this.reservationService.getReservation(data.idZone),
            subZoneReservationEntity: this.reservationService.getSubZoneReservation(data.idSubZone),
          }),
        ),
      )
      .subscribe(({ subZoneReservationEntity }) => {
        this.subZoneReservation = subZoneReservationEntity;
      });

    this.filterDate = (d: Date | null): boolean => {
      const blockDates = this.subZoneReservation!.schedule.map((dSchedule) => dSchedule.day.valueOf());
      const currentDay = this.days[d.getDay()];
      return blockDates.includes(currentDay);
    };
  }

  ngOnInit() {
    this.dateReservation.valueChanges.subscribe((date: Date) => {
      if (date) {
        const day = this.days[date.getDay()];
        this.schedule = this.subZoneReservation!.schedule.filter((s) => s.day === day && s.active);

        // Check time slot
        if (this.schedule.length === 0) {
          this.messagesService.showToastMessage(
            this.translate.instant('createReservation.thereIsNoTimeSlotForTheSelectedDate'),
            this.translate.instant('createReservation.close'),
            10000,
          );
        }
      }
    });
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '',
    );
  }

  getColorButtonHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `background: ${this.hotel.color};  color: #ffffff !important` : '',
    );
  }

  get nameReservation() {
    return this.reservationForm.get('name')!;
  }

  get dateReservation() {
    return this.reservationForm.get('date')!;
  }

  saveBooking() {
    this.err = '';
    this.loader = true;
    const { date, quota, name, schedule } = this.reservationForm.value;
    const request = new BookingRequest();
    request.date = date;
    request.quote = Number(quota);
    request.name = name;
    request.guest = this.guest!;
    console.log({ schedule });
    console.log({ request });
    this.reservationService.saveSubZoneBooking((schedule as ScheduleEntity).id, request).subscribe(
      () => {
        this.loader = true;
        this.router.navigate(['/home', 'reservation']);
        this.messagesService.showToastMessage(
          this.translate.instant('createReservation.yourReservationWasCreatedSuccessfully'),
        );
      },
      (error) => {
        this.loader = false;
        if (error.status === 400) {
          this.err = error.error.message ? this.translate.instant(TYPE_ERROR.space_available) : '';
        } else {
          this.err = this.translate.instant('createReservation.iCantMakeTheReservation');
        }
      },
    );
  }
}
