import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';

import { AdminHomeComponent } from 'hotel/home/page/admin-home/admin-home.component';
import { map } from 'rxjs/operators';
import { ADMIN } from '@contler/core/const';
import { pipe } from 'rxjs';

const redirectToAdmin = () =>
  pipe(
    customClaims,
    map(claim => claim.rol === ADMIN),
    map(isAdmin => (isAdmin && ['home', 'admin']) || true),
  );

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectToAdmin
    },
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
  },
  {
    path: 'employer',
    loadChildren: () => import('hotel/employer/employer.module').then(m => m.EmployerModule)
  },
  {
    path: 'room',
    loadChildren: () => import('hotel/room/room.module').then(m => m.RoomModule)
  },
  {
    path: 'zone',
    loadChildren: () => import('hotel/zone/zone.module').then(m => m.ZoneModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('hotel/guest/guest.module').then(m => m.GuestModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
