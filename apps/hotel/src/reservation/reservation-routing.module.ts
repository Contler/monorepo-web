import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { ScheduleComponent } from 'hotel/reservation/pages/schedule/schedule.component';
import { CalendarComponent } from 'hotel/reservation/pages/calendar/calendar.component';
import { ScheduleSubZoneComponent } from './pages/schedule-sub-zone/schedule-sub-zone.component';

const routes: Routes = [
  { path: '', component: ReservationComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: ':id', component: ScheduleComponent },
  { path: ':idZone/sub-zone/:id', component: ScheduleSubZoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
