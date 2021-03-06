import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestRequestsComponent } from './pages/guest-requests/guest-requests.component';
import { HomeComponent } from './home.component';
import { ZoneRequestComponent } from './pages/zone-request/zone-request.component';
import { pipe } from 'rxjs';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { map, tap } from 'rxjs/operators';
import { GUEST } from '@contler/const';
import firebase from 'firebase/app';
import 'firebase/auth';
import { SpecialRequestComponent } from './pages/special-request/special-request.component';
import { MyInmediateRequestsComponent } from './pages/my-inmediate-requests/my-inmediate-requests.component';
import { InmediateRequestComponent } from './pages/inmediate-request/inmediate-request.component';
import { WakeUpComponent } from 'guest/home/pages/wake-up/wake-up.component';
import { CreateWakeComponent } from 'guest/home/pages/create-wake/create-wake.component';
import { DrinkRequestComponent } from 'guest/home/pages/drink-request/drink-request.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const redirectUnauthorizedToLogin = () =>
  pipe(
    customClaims,
    map((claims) => claims.role === GUEST),
    tap((guest) => !guest && firebase.auth().signOut()),
    map((guest) => guest || ['/login']),
  );

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'guest-requests',
        component: GuestRequestsComponent,
        data: { module: 'immediate-request' },
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
        path: 'zone-request/:id/drink',
        component: DrinkRequestComponent,
      },
      {
        path: 'special-requests',
        component: SpecialRequestComponent,
        data: { module: 'special-request' },
      },
      {
        path: 'wake-up',
        component: WakeUpComponent,
        data: { module: 'wake-up' },
      },
      {
        path: 'wake-up-create',
        component: CreateWakeComponent,
      },
      {
        path: 'reservation',
        loadChildren: () => import('../reservation/reservation.module').then((m) => m.ReservationModule),
      },
      {
        path: 'late',
        loadChildren: () =>
          import('../late-check-out/late-check-out.module').then((m) => m.LateCheckOutModule),
      },
      {
        path: 'product',
        loadChildren: () => import('../product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'reception',
        loadChildren: () => import('../reception/reception.module').then((m) => m.ReceptionModule),
      },
      {
        path: 'my-room',
        loadChildren: () => import('../my-room/my-room.module').then((m) => m.MyRoomModule),
      },
      {
        path: 'maintenance',
        loadChildren: () => import('../maintenance/maintenance.module').then((m) => m.MaintenanceModule),
      },
      {
        path: 'services/:module/:idService',
        loadChildren: () => import('../dynamic-form/dynamic-form.module').then((m) => m.DynamicFormModule),
      },
      {
        path: 'cleaning',
        loadChildren: () => import('../cleaning/cleaning.module').then((m) => m.CleaningModule),
      },
      {
        path: 'my-request',
        loadChildren: () => import('../my-request/my-request.module').then((m) => m.MyRequestModule),
      },
      {
        path: '',
        redirectTo: 'welcome',
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
