import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GuestRequestsComponent } from './pages/guest-requests/guest-requests.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { ZoneRequestComponent } from './pages/zone-request/zone-request.component';



@NgModule({
  declarations: [
    HomeComponent,
    GuestRequestsComponent,
    ZoneRequestComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonComponentsModule,
    MaterialModule
  ]
})
export class HomeModule { }
