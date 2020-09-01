import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MaterialModule } from '../material/material.module';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          { path: '', redirectTo: 'inmediate-requests', pathMatch: 'full' },
          {
            path: 'inmediate-requests',
            loadChildren: () =>
              import('./inmediate-requests/inmediate-requests.module').then(
                m => m.InmediateRequestsPageModule,
              ),
          },
          {
            path: 'special-requests',
            loadChildren: () =>
              import('./special-requests/special-requests.module').then(
                m => m.SpecialRequestsPageModule,
              ),
          },
          {
            path: 'wake-up',
            loadChildren: () => import('../wake-up/wake-up.module').then(m => m.WakeUpModule),
          },
          {
            path: 'statistic',
            loadChildren: () =>
              import('../statistic/statistic.module').then(m => m.StatisticModule),
          },
          {
            path: 'booking',
            loadChildren: () => import('../booking/booking.module').then(m => m.BookingModule),
          },
          {
            path: 'late',
            loadChildren: () =>
              import('../latecheck-out/latecheck-out.module').then(m => m.LatecheckOutModule),
          },
          {
            path: 'order',
            loadChildren: () => import('../order/order.module').then(m => m.OrderModule),
          },
        ],
      },
    ]),
    CommonComponentsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
