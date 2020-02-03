import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ReservationComponent, ReservationFormComponent, ReservationListComponent, ScheduleComponent],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    NgxMaskModule,
  ],
})
export class ReservationModule { }
