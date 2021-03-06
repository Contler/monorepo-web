import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';

import { map } from 'rxjs/operators';
import { ADMIN } from '@contler/const';
import { pipe } from 'rxjs';
import { AdminHomeComponent } from '../home/page/admin-home/admin-home.component';

const redirectToAdmin = () =>
  pipe(
    customClaims,
    map((claim) => claim.rol === ADMIN),
    map((isAdmin) => (isAdmin && ['home', 'admin']) || true),
  );

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToAdmin,
    },
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
  },
  {
    path: 'employer',
    loadChildren: () => import('../employer/employer.module').then((m) => m.EmployerModule),
  },
  {
    path: 'room',
    loadChildren: () => import('../room/room.module').then((m) => m.RoomModule),
  },
  {
    path: 'zone',
    loadChildren: () => import('../zone/zone.module').then((m) => m.ZoneModule),
  },
  {
    path: 'inmediate-requests',
    loadChildren: () =>
      import('../inmediate-requests/inmediate-requests.module').then((m) => m.InmediateRequestsModule),
  },
  {
    path: 'special-requests',
    loadChildren: () =>
      import('../special-requests/special-requests.module').then((m) => m.SpecialRequestsModule),
  },
  {
    path: 'guest',
    loadChildren: () => import('../guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'wake-up',
    loadChildren: () => import('../wake-up/wake-up.module').then((m) => m.WakeUpModule),
  },
  {
    path: 'statistics',
    loadChildren: () => import('../statistics/statistics.module').then((m) => m.StatisticsModule),
  },
  {
    path: 'reservation',
    loadChildren: () => import('../reservation/reservation.module').then((m) => m.ReservationModule),
  },
  {
    path: 'late',
    loadChildren: () => import('../late-check-out/late-check-out.module').then((m) => m.LateCheckOutModule),
  },
  {
    path: 'product',
    loadChildren: () => import('../product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'order',
    loadChildren: () => import('../order/order.module').then((m) => m.OrderModule),
  },
  {
    path: 'restaurant',
    loadChildren: () => import('../restaurant/retaurant.module').then((m) => m.RestaurantModule),
  },
  {
    path: 'menu-category',
    loadChildren: () => import('../menu-category/menu-category.module').then((m) => m.MenuCategoryModule),
  },
  {
    path: 'reception',
    loadChildren: () => import('../reception/reception.module').then((m) => m.ReceptionModule),
  },
  {
    path: 'maintenance',
    loadChildren: () => import('../maintenance/maintenance.module').then((m) => m.MaintenanceModule),
  },
  {
    path: 'request-room',
    loadChildren: () => import('../request-room/request-room.module').then((m) => m.RequestRoomModule),
  },
  {
    path: 'cleaning',
    loadChildren: () => import('../cleaning/cleaning.module').then((m) => m.CleaningModule),
  },
  {
    path: '**',
    component: AdminHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
