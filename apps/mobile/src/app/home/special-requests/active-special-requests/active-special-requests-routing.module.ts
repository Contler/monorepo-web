import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActiveSpecialRequestsPage } from './active-special-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveSpecialRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveSpecialRequestsPageRoutingModule {}
