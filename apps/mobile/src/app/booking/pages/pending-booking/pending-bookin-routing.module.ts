import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingBookingComponent } from './pending-booking.component';

const routes: Routes = [
  {
    path: '',
    component: PendingBookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingBokkingRoutingModule {}
