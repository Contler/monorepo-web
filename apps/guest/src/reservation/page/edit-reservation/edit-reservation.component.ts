import { Component, OnInit } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservationService } from '@contler/core';
import { BookingEntity, HotelEntity, ScheduleEntity } from '@contler/entity';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DAYS } from '@contler/const';
import { ModalConfirmComponent } from 'guest/reservation/components/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'contler-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss'],
})
export class EditReservationComponent implements OnInit {
  private days = DAYS;

  hotel: HotelEntity | null = null;
  booking: BookingEntity | undefined;
  bookingGroup: FormGroup;
  schedule: ScheduleEntity[] = [];
  loader = false;
  error = '';

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private reservationService: ReservationService,
    private router: Router,
    private dialog: MatDialog,
    route: ActivatedRoute,
    formBuild: FormBuilder,
  ) {
    this.bookingGroup = formBuild.group({
      date: ['', Validators.required],
      quota: ['', Validators.required],
      name: ['', Validators.required],
      schedule: ['', Validators.required],
    });
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    route.params
      .pipe(
        map((data) => data['id'] as number),
        switchMap((id) => reservationService.getBooking(id)),
      )
      .subscribe((booking) => {
        this.booking = booking;
        this.booking.date = new Date(this.booking.date);
        this.bookingGroup.get('date')!.setValue(this.booking.date);
        this.bookingGroup.get('quota')!.setValue(this.booking.quote);
        this.bookingGroup.get('name')!.setValue(this.booking.name);
        this.bookingGroup.get('schedule')!.setValue(this.booking.schedule);
      });
  }

  ngOnInit() {
    this.dateReservation.valueChanges.subscribe((date: Date) => {
      const day = this.days[date.getDay()];
      if (this.booking!.schedule.reservation) {
        this.schedule = this.booking!.schedule.reservation.schedule.filter((s) => s.day === day && s.active);
      } else if (this.booking!.schedule.subZone) {
        this.schedule = this.booking!.schedule.subZone.schedule.filter((s) => s.day === day && s.active);
      } else {
        this.schedule = [];
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

  compare(o1: ScheduleEntity, o2: ScheduleEntity) {
    return o1.id === o2.id;
  }

  get dateReservation() {
    return this.bookingGroup.get('date')!;
  }

  confirmCancel() {
    this.dialog
      .open(ModalConfirmComponent, {
        width: '342px',
        height: '353px',
        panelClass: 'cot-dialog',
      })
      .afterClosed()
      .pipe(
        filter((data) => !!data),
        tap(() => (this.loader = true)),
        switchMap(() => this.reservationService.cancelBooking(this.booking!)),
      )
      .subscribe(() => {
        this.loader = false;
        this.router.navigate(['/home/reservation/my-reservation']);
      });
  }

  save() {
    this.error = '';
    this.loader = true;
    const { date, quota, name, schedule } = this.bookingGroup.value;
    this.booking!.date = date;
    this.booking!.quote = quota;
    this.booking!.name = name;
    this.booking!.schedule = schedule;
    this.reservationService.updateBooking(this.booking!).subscribe(
      () => {
        this.router.navigate(['/home/reservation/my-reservation']);
      },
      (error) => {
        this.loader = false;
        this.error = error.error.message;
      },
    );
  }
}
