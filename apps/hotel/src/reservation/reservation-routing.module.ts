import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { ScheduleComponent } from 'hotel/reservation/pages/schedule/schedule.component';

const routes: Routes = [
  { path: '', component: ReservationComponent },
  { path: ':id', component: ScheduleComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }