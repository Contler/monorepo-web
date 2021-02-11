import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationComponent } from './reservation.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from '@contler/core';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarMonthModule } from 'angular-calendar';
import { CalendarDatePipe, ZoneBookPipe } from './pipes';
import { CalendarNextViewDirective, CalendarPreviuosViewDirective } from './directives';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { SubZoneReservationFormComponent } from './components/sub-zone-reservation-form/sub-zone-reservation-form.component';
import { ScheduleSubZoneComponent } from './pages/schedule-sub-zone/schedule-sub-zone.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    ReservationComponent,
    ReservationFormComponent,
    ReservationListComponent,
    ScheduleComponent,
    CalendarComponent,
    ZoneBookPipe,
    CalendarDatePipe,
    CalendarPreviuosViewDirective,
    CalendarNextViewDirective,
    SubZoneReservationFormComponent,
    ScheduleSubZoneComponent,
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskModule,
    CoreModule,
    CalendarMonthModule,
    FormsModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
  ],
})
export class ReservationModule {}
