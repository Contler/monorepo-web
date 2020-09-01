import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { CreateReservationComponent } from 'guest/reservation/page/create-reservation/create-reservation.component';
import { MyReservationsComponent } from 'guest/reservation/page/my-reservations/my-reservations.component';
import { EditReservationComponent } from 'guest/reservation/page/edit-reservation/edit-reservation.component';

const routes: Routes = [
  { path: '', component: ReservationComponent },
  { path: 'my-reservation', component: MyReservationsComponent },
  { path: 'my-reservation/:id', component: EditReservationComponent },
  { path: ':id', component: CreateReservationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
