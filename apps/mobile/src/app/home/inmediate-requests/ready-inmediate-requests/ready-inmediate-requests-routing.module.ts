import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadyInmediateRequestsPage } from './ready-inmediate-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ReadyInmediateRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadyInmediateRequestsPageRoutingModule {}
