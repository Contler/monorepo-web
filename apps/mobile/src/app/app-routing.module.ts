import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotLoggedGuard } from './guards/not-logged.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginPageModule),
    canActivate: [NotLoggedGuard]
  },
  {
    path: 'special-requests',
    loadChildren: () => import('./home/special-requests/special-requests.module').then( m => m.SpecialRequestsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
