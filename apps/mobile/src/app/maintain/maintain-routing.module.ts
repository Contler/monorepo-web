import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintainComponent } from './maintain.component';

const routes: Routes = [
  {
    path: '',
    component: MaintainComponent,
    children: [
      {
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full',
      },
      {
        path: 'pending',
        loadChildren: () =>
          import('./pages/pending-maintain/pending-maintain.module').then((m) => m.PendingMaintainModule),
      },
      {
        path: 'ready',
        loadChildren: () =>
          import('./pages/ready-maintain/ready-maintain.module').then((m) => m.ReadyMaintainModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintainRoutingModule {}
