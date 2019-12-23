import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PastSpecialRequestsPage } from './past-special-requests.page';

const routes: Routes = [
  {
    path: '',
    component: PastSpecialRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastSpecialRequestsPageRoutingModule {}
