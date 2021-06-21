import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { PendingComponent } from './pages/pending-reception/pending.component';

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
        component: PendingComponent,
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
