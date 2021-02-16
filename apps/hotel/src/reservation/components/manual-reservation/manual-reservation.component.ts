import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from 'hotel/guest/services/guest.service';
import { map, startWith, switchMap } from 'rxjs/operators';
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
  selectZone: ZoneReserveEntity;

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
      const blockDates = this.selectZone?.schedule.map((sc) => sc.day.valueOf());
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
  }

  zoneChange(zone: ZoneReserveEntity) {
    if (zone.subZone.length > 0) {
      this.reservationForm.addControl('subZone', new FormControl('', Validators.required));
      this.dateControl.disable();
      this.hourControl.disable();
      this.selectZone = null;
    } else {
      this.reservationForm.removeControl('subZone');
      this.dateControl.enable();
      this.hourControl.enable();
      this.dateControl.setValue(null);
      this.hourControl.setValue(null);
      this.selectZone = zone;
    }
  }

  subZoneChange(zone: ZoneReserveEntity) {
    this.selectZone = zone;
    this.dateControl.enable();
    this.hourControl.enable();
    this.dateControl.setValue(null);
    this.hourControl.setValue(null);
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

  get subZoneControl() {
    return this.reservationForm.get('subZone');
  }

  get zone(): ZoneReserveEntity {
    return this.zoneControl.value;
  }

  get room(): RoomEntity {
    return this.nameControl ? (this.nameControl.value as GuestEntity)?.room : null;
  }

  get schedule(): ScheduleEntity[] {
    return this.selectZone && this.dateSelect
      ? this.selectZone.schedule.filter((sc) => sc.day === this.days[this.dateSelect.getDay()])
      : [];
  }

  get dateControl() {
    return this.reservationForm.get('date');
  }

  get dateSelect(): Date {
    return this.dateControl.value;
  }

  get hourControl() {
    return this.reservationForm.get('hour');
  }

  private guestFilter(guest: GuestEntity, name: string) {
    const nameComplete = this.getNameGuest(guest).toLowerCase();
    return nameComplete.includes(name.toLowerCase());
  }
}
