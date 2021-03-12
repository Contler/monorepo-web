import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyRequestComponent } from './my-request.component';
import { DetailRequestComponent } from './pages/detail-request/detail-request.component';

const routes: Routes = [
  { path: '', component: MyRequestComponent },
  { path: ':id', component: DetailRequestComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRequestRoutingModule {}
