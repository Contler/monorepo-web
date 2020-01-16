import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WakeUpComponent } from './wake-up.component';
import { WakePendingComponent } from './pages/wake-pending/wake-pending.component';
import { WakeCompleteComponent } from './pages/wake-complete/wake-complete.component';

const routes: Routes = [
  {
    path: '',
    component: WakeUpComponent,
    children: [
      {
        path: 'pending',
        component: WakePendingComponent,
      },
      {
        path: 'complete',
        component: WakeCompleteComponent,
      },
      {
        path: '',
        redirectTo: '/home/wake-up/pending',
        pathMatch: 'full'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WakeUpRoutingModule {}
