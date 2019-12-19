import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { GuestRequestsComponent } from './pages/guest-requests/guest-requests.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { ZoneRequestComponent } from './pages/zone-request/zone-request.component';
import { CoreModule } from '@contler/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SpecialRequestComponent } from './pages/special-request/special-request.component';
import { MyInmediateRequestsComponent } from './pages/my-inmediate-requests/my-inmediate-requests.component';
import { PipesModule } from 'guest/pipes/pipes.module';
import { InmediateRequestComponent } from './pages/inmediate-request/inmediate-request.component';

@NgModule({
  declarations: [
    HomeComponent,
    GuestRequestsComponent,
    ZoneRequestComponent,
    SpecialRequestComponent,
    MyInmediateRequestsComponent,
    InmediateRequestComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class HomeModule { }
