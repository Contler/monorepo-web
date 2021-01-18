import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';

const routes: Routes = [{ path: '', component: BookingComponent }];

@NgModule({
  declarations: [BookingComponent, ModalConfirmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BookingRoutingModule,
    MaterialModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CommonComponentsModule,
    TranslateModule,
    DynamicTranslateModule,
  ],
  entryComponents: [ModalConfirmComponent],
})
export class BookingModule {}
