import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialRequestsComponent } from './page/special-requests/special-requests.component';


const routes: Routes = [
  {
    path: '',
    component: SpecialRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialRequestsRoutingModule { }