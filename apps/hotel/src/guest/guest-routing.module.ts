import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './page/guest/guest.component';
import { NewGuestComponent } from '@contler/hotel/guest/components/new-guest/new-guest.component';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
  },
  {
    path: 'new',
    component: NewGuestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
