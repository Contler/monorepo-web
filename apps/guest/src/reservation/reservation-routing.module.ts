import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { CreateReservationComponent } from 'guest/reservation/page/create-reservation/create-reservation.component';
import { MyReservationsComponent } from 'guest/reservation/page/my-reservations/my-reservations.component';
import { EditReservationComponent } from 'guest/reservation/page/edit-reservation/edit-reservation.component';
import { SubZoneReservationComponent } from './page/sub-zone-reservation/sub-zone-reservation.component';

const routes: Routes = [
  { path: '', component: ReservationComponent, data: { module: 'reservation' } },
  { path: 'my-reservation', component: MyReservationsComponent },
  { path: 'my-reservation/:id', component: EditReservationComponent },
  { path: ':id', component: CreateReservationComponent },
  { path: ':idZone/sub-zone', component: SubZoneReservationComponent },
  { path: ':idZone/sub-zone/:idSubZone', component: CreateReservationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
