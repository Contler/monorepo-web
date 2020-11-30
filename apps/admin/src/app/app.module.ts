import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CoreModule } from '@contler/core';
import {
  MAT_COLOR_FORMATS,
  NGX_MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
} from '@angular-material-components/color-picker';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  AngularFireAuthGuard,
  AngularFireAuthGuardModule,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from "@angular/fire/database";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const isLogin = () => redirectLoggedInTo(['home']);

const routers: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLogin },
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routers, { initialNavigation: 'enabled' }),
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.fire),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
    AngularFireDatabaseModule,
    CoreModule.forRoot({ urlBackend: environment.apiUrl }),
    NgxMatColorPickerModule,
    HttpClientModule,
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent],
})
export class AppModule {}
