import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AvalibleUserGuard } from 'guest/common-components/guards/avalible-user.guard';

const isLogin = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLogin },
  },
  {
    path: 'home',
    loadChildren: () => import('guest/home/home.module').then((m) => m.HomeModule),
    canActivate: [AngularFireAuthGuard],
    canActivateChild: [AvalibleUserGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
