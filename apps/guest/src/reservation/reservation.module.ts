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
import { EditReservationComponent } from './page/edit-reservation/edit-reservation.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { SubZoneReservationComponent } from './page/sub-zone-reservation/sub-zone-reservation.component';
import { MatMenuModule } from '@angular/material/menu';
import { FilterReservationPipe } from './pipes/filter-reservation.pipe';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    ReservationComponent,
    CreateReservationComponent,
    MyReservationsComponent,
    EditReservationComponent,
    ModalConfirmComponent,
    SubZoneReservationComponent,
    FilterReservationPipe,
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    NgxMaskModule,
    ReactiveFormsModule,
    CoreModule,
    TranslateModule,
    DynamicTranslateModule,
    MatMenuModule,
    MatBottomSheetModule,
  ],
  entryComponents: [ModalConfirmComponent],
})
export class ReservationModule {}
