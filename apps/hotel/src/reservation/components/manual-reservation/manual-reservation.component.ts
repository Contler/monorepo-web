import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuestService } from 'hotel/guest/services/guest.service';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { GuestEntity, RoomEntity, ScheduleEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { ReservationService } from '@contler/core';
import { AuthService } from 'hotel/services/auth.service';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { DAYS, TYPE_ERROR } from '@contler/const';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'contler-manual-reservation',
  templateUrl: './manual-reservation.component.html',
  styleUrls: ['./manual-reservation.component.scss'],
  providers: [GuestService],
})
export class ManualReservationComponent implements OnInit {
  private guests: GuestEntity[] = [];
  private days = DAYS;

  reservationForm: FormGroup;
  $guestList: Observable<GuestEntity[]>;
  $zone: Observable<ZoneReserveEntity[]>;
  filterDate: Function;
  actualDay = new Date();
  load = false;
  err: string;

  constructor(
    formBuild: FormBuilder,
    private guestService: GuestService,
    private reservationService: ReservationService,
    private auth: AuthService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<ManualReservationComponent>,
  ) {
    this.reservationForm = formBuild.group({
      name: ['', Validators.required],
      zone: ['', Validators.required],
      person: ['', Validators.required],
      date: ['', Validators.required],
      hour: ['', Validators.required],
    });

    this.dateControl.disable();
    this.hourControl.disable();

    this.filterDate = (date: Date) => {
      const blockDates = (this.zoneControl?.value as ZoneReserveEntity).schedule.map((sc) =>
        sc.day.valueOf(),
      );
      const currentDay = this.days[date.getDay()];
      return blockDates.includes(currentDay);
    };
  }

  ngOnInit(): void {
    this.guestService.getGuest().subscribe((data) => (this.guests = data));
    this.$zone = this.auth.$employer.pipe(
      switchMap((employer) => this.reservationService.getHotelReservation(employer.hotel.uid)),
    );
    this.$guestList = this.nameControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : this.getNameGuest(value))),
      map((value) => this.guests.filter((guest) => this.guestFilter(guest, value))),
    );

    this.zoneControl.valueChanges
      .pipe(
        filter((value) => !!value),
        take(1),
      )
      .subscribe(() => {
        this.dateControl.enable();
        this.hourControl.enable();
      });
  }

  getNameGuest(guest: GuestEntity) {
    return guest ? `${guest.name} ${guest.lastName}` : '';
  }

  createReservation() {
    this.load = true;
    const { hour, date, name, person } = this.reservationForm.value;
    this.reservationService
      .saveBooking((hour as ScheduleEntity).id, {
        date,
        description: '',
        guest: name,
        quote: person,
        name: this.getNameGuest(name),
      })
      .subscribe(
        () => {
          this.load = false;
          this.dialogRef.close();
        },
        (error) => {
          this.load = false;
          if (error.status === 400) {
            this.err = error.error.message ? this.translate.instant(TYPE_ERROR.space_available) : '';
          } else {
            this.err = this.translate.instant('createReservation.iCantMakeTheReservation');
          }
        },
      );
  }

  get nameControl() {
    return this.reservationForm.get('name');
  }

  get zoneControl() {
    return this.reservationForm.get('zone');
  }

  get room(): RoomEntity {
    return this.nameControl ? (this.nameControl.value as GuestEntity)?.room : null;
  }

  get schedule(): ScheduleEntity[] {
    return this.zoneControl ? (this.zoneControl.value as ZoneReserveEntity)?.schedule : [];
  }

  get dateControl() {
    return this.reservationForm.get('date');
  }

  get hourControl() {
    return this.reservationForm.get('hour');
  }

  private guestFilter(guest: GuestEntity, name: string) {
    const nameComplete = this.getNameGuest(guest).toLowerCase();
    return nameComplete.includes(name.toLowerCase());
  }
}
