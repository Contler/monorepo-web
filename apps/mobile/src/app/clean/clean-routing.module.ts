import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CleanComponent } from './clean.component';

const routes: Routes = [
  {
    path: '',
    component: CleanComponent,
    children: [
      {
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full',
      },
      {
        path: 'pending',
        loadChildren: () =>
          import('./pages/pending-cleaning/pending-cleaning.module').then((m) => m.PendingCleaningModule),
      },
      {
        path: 'ready',
        loadChildren: () =>
          import('./pages/ready-cleaning/ready-cleaning.module').then((m) => m.ReadyCleaningModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleanRoutingModule {}
