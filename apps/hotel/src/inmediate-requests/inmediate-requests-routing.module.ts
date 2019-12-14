import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InmediateRequestsComponent } from './page/inmediate-requests/inmediate-requests.component';


const routes: Routes = [
  {
    path: '',
    component: InmediateRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmediateRequestsRoutingModule { }
