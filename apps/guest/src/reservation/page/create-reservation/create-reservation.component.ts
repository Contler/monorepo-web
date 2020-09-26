import { Component, OnInit } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { GuestEntity, HotelEntity, ScheduleEntity } from '@contler/entity';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DAYS, TYPE_ERROR } from '@contler/const';
import { BookingRequest } from '@contler/models/booking-request';
import { MessagesService } from 'guest/services/messages/messages.service';

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
        map((data) => data['id']),
        switchMap((id) => this.reservationService.getReservation(id)),
      )
      .subscribe((data) => {
        this.zoneReservation = data;
      });

    this.filterDate = (d: Date | null): boolean => {
      const blockDates = this.zoneReservation!.schedule.map((dSchedule) => dSchedule.day.valueOf());
      const currentDay = this.days[d.getDay()];
      return blockDates.includes(currentDay);
    };
  }

  ngOnInit() {
    this.dateReservation.valueChanges.subscribe((date: Date) => {
      if (date) {
        const day = this.days[date.getDay()];
        this.schedule = this.zoneReservation!.schedule.filter((s) => s.day === day && s.active);

        // Check time slot
        if (this.schedule.length === 0) {
          this.messagesService.showToastMessage(
            'There is no time slot for the selected date.',
            'To close',
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
    this.reservationService.saveBooking((schedule as ScheduleEntity).id, request).subscribe(
      () => {
        this.loader = true;
        this.router.navigate(['/home', 'reservation']);
      },
      (error) => {
        this.loader = false;
        if (error.status === 400) {
          this.err = error.error.message ? TYPE_ERROR.space_available : '';
        } else {
          this.err = "I can't make the reservation";
        }
      },
    );
  }
}
