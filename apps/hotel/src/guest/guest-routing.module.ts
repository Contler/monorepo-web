import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from 'hotel/guest/page/guest/guest.component';


const routes: Routes = [
  {
    path: '',
    component: GuestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
