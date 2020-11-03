import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingComponent } from './booking.component';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full',
      },
      {
        path: 'pending',
        loadChildren: () =>
          import('./pages/pending-booking/pending-booking.module').then((m) => m.PendingBookingModule),
      },
      {
        path: 'ready',
        loadChildren: () =>
          import('./pages/ready-booking/ready-booking.module').then((m) => m.ReadyBookingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
