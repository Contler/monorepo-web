import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestRequestsComponent } from './pages/guest-requests/guest-requests.component';
import { HomeComponent } from './home.component';
import { ZoneRequestComponent } from './pages/zone-request/zone-request.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'guest-requests',
        component: GuestRequestsComponent,
      },
      {
        path: 'zone-request/:id',
        component: ZoneRequestComponent,
      },
      {
        path: '',
        redirectTo: 'guest-requests',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
