import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpecialRequestsPage } from './special-requests.page';

const routes: Routes = [
  {
    path: "",
    component: SpecialRequestsPage,
    children: [
      {
        path: "",
        redirectTo: "active",
        pathMatch: "full"
      },
      {
        path: "active",
        loadChildren: () =>
          import(
            "./active-special-requests/active-special-requests.module"
          ).then(m => m.ActiveSpecialRequestsPageModule)
      },
      {
        path: "past",
        loadChildren: () =>
          import("./past-special-requests/past-special-requests.module").then(
            m => m.PastSpecialRequestsPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialRequestsPageRoutingModule {}
