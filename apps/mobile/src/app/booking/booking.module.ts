import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { IonicModule } from '@ionic/angular';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { PipesModule } from '../pipes/pipes.module';

const routes: Routes = [
  { path: '', component: BookingComponent }
];

@NgModule({
  declarations: [BookingComponent, ModalConfirmComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    CoreModule,
    IonicModule,
    PipesModule
  ],
  entryComponents: [ModalConfirmComponent]
})
export class BookingModule { }
