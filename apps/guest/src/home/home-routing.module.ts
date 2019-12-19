import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestRequestsComponent } from './pages/guest-requests/guest-requests.component';
import { HomeComponent } from './home.component';
import { ZoneRequestComponent } from './pages/zone-request/zone-request.component';
import { pipe } from 'rxjs';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { map, tap } from 'rxjs/operators';
import { GUEST } from 'lib/const';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { SpecialRequestComponent } from './pages/special-request/special-request.component';
import { MyInmediateRequestsComponent } from './pages/my-inmediate-requests/my-inmediate-requests.component';
import { InmediateRequestComponent } from './pages/inmediate-request/inmediate-request.component';
const redirectUnauthorizedToLogin = () =>
  pipe(
    customClaims,
    map(claims => claims.rol === GUEST),
    tap(guest => !guest && firebase.auth().signOut()),
    map(guest => guest || ['/login']),
  );

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'guest-requests',
        component: GuestRequestsComponent,
      },
      {
        path: 'my-inmediate-requests',
        component: MyInmediateRequestsComponent,
      },
      {
        path: 'inmediate-request/:uid',
        component: InmediateRequestComponent,
      },
      {
        path: 'zone-request/:id',
        component: ZoneRequestComponent,
      },
      {
        path: 'special-requests',
        component: SpecialRequestComponent,
      },
      {
        path: '',
        redirectTo: 'guest-requests',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
