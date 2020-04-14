import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderPendingComponent } from './pages/order-pending/order-pending.component';
import { OrderCompleteComponent } from './pages/order-complete/order-complete.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    children: [
      {
        path: 'pending',
        component: OrderPendingComponent,
      },
      {
        path: 'complete',
        component: OrderCompleteComponent,
      },
      {
        path: '',
        redirectTo: '/home/order/pending',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
