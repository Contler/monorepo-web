import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { CommonComponentsModule } from 'guest/common-components/common-components.module';
import { MaterialModule } from 'guest/material/material.module';
import { CreateReservationComponent } from './page/create-reservation/create-reservation.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { MyReservationsComponent } from './page/my-reservations/my-reservations.component';


@NgModule({
  declarations: [ReservationComponent, CreateReservationComponent, MyReservationsComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    NgxMaskModule,
    ReactiveFormsModule,
    CoreModule,
  ],
})
export class ReservationModule { }
