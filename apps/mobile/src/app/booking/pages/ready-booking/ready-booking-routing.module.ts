import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadyBookingComponent } from './ready-booking.component';

const routes: Routes = [
  {
    path: '',
    component: ReadyBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyBookingRoutingModule {}
