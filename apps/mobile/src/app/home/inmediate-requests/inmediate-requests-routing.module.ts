import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InmediateRequestsPage } from './inmediate-requests.page';

const routes: Routes = [
  {
    path: "",
    component: InmediateRequestsPage,
    children: [
      {
        path: "",
        redirectTo: "pending",
        pathMatch: "full"
      },
      {
        path: "pending",
        loadChildren: () =>
          import(
            "./pending-inmediate-requests/pending-inmediate-requests.module"
          ).then(m => m.PendingInmediateRequestsPageModule)
      },
      {
        path: "ready",
        loadChildren: () =>
          import(
            "./ready-inmediate-requests/ready-inmediate-requests.module"
          ).then(m => m.ReadyInmediateRequestsPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InmediateRequestsPageRoutingModule {}
