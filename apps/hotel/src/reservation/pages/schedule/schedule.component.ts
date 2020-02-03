import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CategoryEntity, ScheduleEntity } from '@contler/entity';
import { ICONS } from '@contler/const';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { ReservationService } from '@contler/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'contler-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  categoryZone: Observable<CategoryEntity[]>;
  icons = ICONS;
  reservationForm: FormGroup;
  schedules: ScheduleEntity[] = [];
  filterIcon: Observable<String[]>;
  loader = false;

  private reservation: ZoneReserveEntity | undefined;
  private removeSchedule: ScheduleEntity[] = [];
  private categories: CategoryEntity[] = [];

  constructor(
    private zoneServices: ZoneService,
    private reservationService: ReservationService,
    private router: Router,
    route: ActivatedRoute,
    formBuild: FormBuilder,
  ) {
    this.categoryZone = this.zoneServices.getCategories().pipe(tap(cat => (this.categories = cat)));

    this.reservationForm = formBuild.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      icon: [],
    });
    this.filterIcon = this.icon.valueChanges.pipe(
      startWith(''),
      map((data: string) => data.toLowerCase()),
      map(data => this.icons.filter(icon => icon.toLowerCase().includes(data))),
    );
    route.params
      .pipe(
        filter(data => !!data['id']),
        map(data => data['id'] as number),
        switchMap(id => reservationService.getReservation(id)),
      )
      .subscribe(reservation => {
        this.reservation = reservation;
        this.reservation.schedule = this.reservation.schedule.map(schedule => plainToClass(ScheduleEntity, schedule));
        this.schedules = this.reservation.schedule;
        this.reservationForm.get('name')!.setValue(this.reservation.name);
        this.reservationForm.get('category')!.setValue(this.reservation.category.id);
        this.reservationForm.get('icon')!.setValue(this.reservation.icon);
      });
  }

  ngOnInit() {}

  addSchedule() {
    const temp = new ScheduleEntity();
    temp.active = false;
    this.schedules = [...this.schedules, temp];
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
    this.reservation!.name = name;
    this.reservation!.category = this.categories.find(cat => cat.id === category)!;
    this.reservation!.icon = icon;

    const newScheduleObs = this.schedules
      .filter(schedule => !schedule.id)
      .map(schedule => this.reservationService.createSchedule(this.reservation!.id, schedule));

    const deleteSchedule = this.removeSchedule.map(schedule => this.reservationService.deleteSchedule(schedule.id));

    forkJoin([
      ...newScheduleObs,
      ...deleteSchedule,
      ...this.reservation!.schedule.map(schedule => this.reservationService.updateSchedule(schedule)),
      this.reservationService.updateReservation(this.reservation!),
    ]).subscribe(() => {
      this.loader = false;
      this.router.navigate(['/home', 'reservation']);
    });
  }

  deleteReservation() {
    this.loader = true;
    const deleteSchedule = [
      ...this.removeSchedule.map(schedule => this.reservationService.deleteSchedule(schedule.id)),
      ...this.reservation!.schedule.map(schedule => this.reservationService.deleteSchedule(schedule.id)),
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
}
