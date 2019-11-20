import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  AngularFireAuthGuardModule,
  AngularFireAuthGuard,
} from '@angular/fire/auth-guard';

import { AppComponent } from 'hotel/app/app.component';
import { environment } from 'hotel/environments/environment';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const isLogin = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('hotel/login/login.module').then(m => m.LoginModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: isLogin}
  },
  {
    path: 'home',
    loadChildren: () => import('hotel/home/home.module').then(m => m.HomeModule),
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' },
    ),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
