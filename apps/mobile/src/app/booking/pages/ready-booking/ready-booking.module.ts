import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyBookingComponent } from './ready-booking.component';
import { ReadyBookingRoutingModule } from './ready-booking-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { MaterialModule } from '../../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadyBookingRoutingModule,
    CommonComponentsModule,
    PipesModule,
    MaterialModule,
    TranslateModule,
  ],
  declarations: [ReadyBookingComponent],
})
export class ReadyBookingModule {}
