import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './reception.component';

const routes: Routes = [
  {
    path: '',
    component: ReceptionComponent,
    children: [
      {
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full',
      },
      {
        path: 'pending',
        loadChildren: () => import('./pages/pending-reception/pending.module').then((m) => m.PendingModule),
      },
      {
        path: 'ready',
        loadChildren: () => import('./pages/ready-reception/ready.module').then((m) => m.ReadyModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}
