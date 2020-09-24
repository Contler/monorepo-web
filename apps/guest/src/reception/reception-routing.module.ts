import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptionComponent } from './reception.component';
import { TransportationComponent } from './pages/transportation/transportation.component';

const routes: Routes = [
  { path: '', component: ReceptionComponent },
  { path: 'transportation', component: TransportationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}
