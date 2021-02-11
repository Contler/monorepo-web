import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CategoryEntity, HotelEntity, ScheduleEntity } from '@contler/entity';
import { AllDays, DAYS, ICONS } from '@contler/const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { ReservationService } from '@contler/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@contler/dynamic-translate';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { AuthService } from 'hotel/services/auth.service';
import { SubZoneReserveEntity } from '@contler/entity/sub-zone-reserve.entity';

@Component({
  selector: 'contler-schedule-sub-zone',
  templateUrl: './schedule-sub-zone.component.html',
  styleUrls: ['./schedule-sub-zone.component.scss'],
})
export class ScheduleSubZoneComponent implements OnInit {
  icons = ICONS;
  days = DAYS;
  reservationForm: FormGroup;
  schedules: ScheduleEntity[] = [];
  filterIcon: Observable<String[]>;
  loader = false;

  subZoneReserveEntity: SubZoneReserveEntity;
  categories: CategoryEntity[] = [];
  zoneReservations$: Observable<ZoneReserveEntity[]>;
  private removeSchedule: ScheduleEntity[] = [];
  private hotel: HotelEntity;
  private id: number;

  constructor(
    private zoneService: ZoneService,
    private reservationService: ReservationService,
    private router: Router,
    route: ActivatedRoute,
    formBuild: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
    private auth: AuthService,
  ) {
    this.zoneReservations$ = this.auth.$employer.pipe(
      tap((user) => (this.hotel = user.hotel)),
      switchMap((employer) => reservationService.getHotelReservation(employer.hotel.uid)),
    );
    this.reservationForm = formBuild.group({
      name: ['', Validators.required],
      zoneParent: ['', Validators.required],
      icon: [],
    });
    this.filterIcon = this.icon.valueChanges.pipe(
      startWith(''),
      map((data: string) => data.toLowerCase()),
      map((data) => this.icons.filter((icon) => icon.toLowerCase().includes(data))),
    );
    route.params
      .pipe(
        filter((data) => !!data['id']),
        map((data) => data['id'] as number),
        tap((id) => (this.id = id)),
        switchMap((id) => reservationService.getReservation(id)),
        switchMap(() => reservationService.getSubZoneReservation(this.id)),
      )
      .subscribe((subZoneReservation) => {
        this.subZoneReserveEntity = subZoneReservation;
        this.subZoneReserveEntity.schedule = this.subZoneReserveEntity.schedule.map((schedule) =>
          plainToClass(ScheduleEntity, schedule),
        );
        this.schedules = this.subZoneReserveEntity.schedule;
        this.translate.getTranslate(this.subZoneReserveEntity.name).subscribe((value) => {
          this.reservationForm.get('name')!.setValue(value);
        });
        this.reservationForm.get('zoneParent')!.setValue(this.subZoneReserveEntity.zoneParent.id);
        this.reservationForm.get('icon')!.setValue(this.subZoneReserveEntity.icon);
      });
  }

  ngOnInit() {}

  addSchedule() {
    const finderSchedule = this.schedules.find((el) => el.day === AllDays);
    const temp = new ScheduleEntity();

    // Create schedules all days
    if (finderSchedule) {
      this.createRangeAllDays(finderSchedule);
    } else {
      temp.active = false;
      this.schedules = [...this.schedules, temp];
    }

    this.cdRef.detectChanges();
  }

  createRangeAllDays(finderSchedule: ScheduleEntity) {
    const arrSchedules: any[] = [];
    for (let idx = 0; idx < this.days.length; idx++) {
      arrSchedules.push({
        active: finderSchedule.active,
        day: this.days[idx],
        quota: finderSchedule.quota,
        timeInit: finderSchedule.timeInit,
        timeFinish: finderSchedule.timeFinish,
      });
    }
    this.schedules = [...arrSchedules, ...this.schedules.filter((el) => el.day !== AllDays)];
    this.removeElement(
      finderSchedule,
      this.schedules.findIndex((el) => el.day === AllDays),
    );
  }

  removeElement(schedule: ScheduleEntity, index: number) {
    if (schedule.id) {
      this.removeSchedule.push(schedule);
    }
    this.schedules = this.schedules.filter((value, index1) => index !== index1);
  }

  save() {
    this.loader = true;
    const { name, zoneParent, icon } = this.reservationForm.value;
    this.translate
      .updateTranslate(this.subZoneReserveEntity.name, name, this.subZoneReserveEntity.hotel.uid)
      .subscribe();
    this.subZoneReserveEntity!.zoneParent = zoneParent;
    this.subZoneReserveEntity!.icon = icon;

    // Create schedules all days
    const finderSchedule = this.schedules.find((el) => el.day === AllDays);
    if (finderSchedule) {
      this.createRangeAllDays(finderSchedule);
    }

    // new schedule
    const newScheduleObs = this.schedules
      .filter((schedule) => !schedule.id)
      .map((schedule) =>
        this.reservationService.createSubZoneSchedule(this.subZoneReserveEntity!.id, schedule),
      );

    //delete schedule
    const deleteSchedule = this.removeSchedule.map((schedule) =>
      this.reservationService.deleteSubZoneSchedule(schedule.id),
    );
    deleteSchedule.forEach((item) => item.subscribe());

    //update schedule
    const updateSchedule = this.subZoneReserveEntity!.schedule.map((schedule) =>
      this.reservationService.updateSubZoneSchedule(schedule),
    );
    updateSchedule.forEach((item) => item.subscribe());

    // update reservation
    this.reservationService.updateSubZoneReservation(this.subZoneReserveEntity!).subscribe(() => {
      setTimeout(() => {
        forkJoin([...newScheduleObs]).subscribe();
      }, 100);
      this.loader = false;
      this.router.navigate(['/home', 'reservation']);
    });
  }

  deleteReservation() {
    this.loader = true;
    const deleteSchedule = [
      ...this.removeSchedule.map((schedule) => this.reservationService.deleteSubZoneSchedule(schedule.id)),
      ...this.subZoneReserveEntity!.schedule.map((schedule) =>
        this.reservationService.deleteSubZoneSchedule(schedule.id),
      ),
    ];

    forkJoin(deleteSchedule)
      .pipe(switchMap(() => this.reservationService.deleteSubZoneReservation(this.subZoneReserveEntity!.id)))
      .subscribe(() => {
        this.loader = false;
        this.router.navigate(['/home', 'reservation']);
      });
  }

  get icon() {
    return this.reservationForm.get('icon')!;
  }
}
