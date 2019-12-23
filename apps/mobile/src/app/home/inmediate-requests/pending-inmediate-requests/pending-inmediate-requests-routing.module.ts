import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PendingInmediateRequestsPage } from './pending-inmediate-requests.page';

const routes: Routes = [
  {
    path: '',
    component: PendingInmediateRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingInmediateRequestsPageRoutingModule {}
