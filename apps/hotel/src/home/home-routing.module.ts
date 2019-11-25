import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';

import { Claim } from '@contler/core/models';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
