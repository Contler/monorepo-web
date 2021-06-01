import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CategoryEntity, ScheduleEntity } from '@contler/entity';
import { AllDays, DAYS, ICONS } from '@contler/const';
import { ZoneService } from '@contler/hotel/zone/services/zone.service';
import { ReservationService } from '@contler/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, startWith, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { plainToClass } from 'class-transformer';
import { TranslateService } from '@contler/dynamic-translate';

@Component({
  selector: 'contler-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  categoryZone: Observable<CategoryEntity[]>;
  icons = ICONS;
  days = DAYS;
  reservationForm: FormGroup;
  schedules: ScheduleEntity[] = [];
  filterIcon: Observable<String[]>;
  loader = false;

  reservation: ZoneReserveEntity | undefined;
  categories: CategoryEntity[] = [];
  private removeSchedule: ScheduleEntity[] = [];

  constructor(
    private zoneService: ZoneService,
    private reservationService: ReservationService,
    private router: Router,
    route: ActivatedRoute,
    formBuild: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private translate: TranslateService,
  ) {
    this.categoryZone = this.zoneService.getCategories().pipe(tap((cat) => (this.categories = cat)));

    this.reservationForm = formBuild.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
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
        switchMap((id) => reservationService.getReservation(id)),
      )
      .subscribe((reservation) => {
        this.reservation = reservation;
        this.reservation.schedule = this.reservation.schedule.map((schedule) =>
          plainToClass(ScheduleEntity, schedule),
        );
        this.schedules = this.reservation.schedule;
        this.translate.getTranslate(this.reservation.name).subscribe((value) => {
          this.reservationForm.get('name')!.setValue(value);
        });
        this.reservationForm.get('category')!.setValue(this.reservation.category.id);
        this.reservationForm.get('icon')!.setValue(this.reservation.icon);
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
    const { name, category, icon } = this.reservationForm.value;
    this.translate.updateTranslate(this.reservation.name, name, this.reservation.hotel.uid).subscribe();
    this.reservation!.category = this.categories.find((cat) => cat.id === category)!;
    this.reservation!.icon = icon;

    // Create schedules all days
    const finderSchedule = this.schedules.find((el) => el.day === AllDays);
    if (finderSchedule) {
      this.createRangeAllDays(finderSchedule);
    }

    // new schedule
    const newScheduleObs = this.schedules
      .filter((schedule) => !schedule.id)
      .map((schedule) => this.reservationService.createSchedule(this.reservation!.id, schedule));

    //delete schedule
    const deleteSchedule = this.removeSchedule.map((schedule) =>
      this.reservationService.deleteSchedule(schedule.id),
    );
    deleteSchedule.forEach((item) => item.subscribe());

    //update schedule
    const updateSchedule = this.reservation!.schedule.map((schedule) =>
      this.reservationService.updateSchedule(schedule),
    );
    updateSchedule.forEach((item) => item.subscribe());

    // update reservation
    this.reservationService.updateReservation(this.reservation!).subscribe(() => {
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
      ...this.removeSchedule.map((schedule) => this.reservationService.deleteSchedule(schedule.id)),
      ...this.reservation!.schedule.map((schedule) => this.reservationService.deleteSchedule(schedule.id)),
    ];

    forkJoin(deleteSchedule)
      .pipe(switchMap(() => this.reservationService.deleteReservation(this.reservation!.id)))
      .subscribe(() => {
        this.loader = false;
        this.router.navigate(['/home', 'reservation']);
      });
  }

  get icon() {
    return this.reservationForm.get('icon')!;
  }

  changeLanguage(): void {
    if (this.reservationForm) {
      this.translate
        .getTranslate(this.reservation.name)
        .pipe(first())
        .subscribe((value) => {
          this.reservationForm.get('name')!.setValue(value);
        });
    }
  }
}
