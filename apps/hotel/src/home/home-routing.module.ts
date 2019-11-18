import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminHomeComponent } from 'hotel/home/page/admin-home/admin-home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin'
  },
  {
    path: 'admin',
    component: AdminHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
