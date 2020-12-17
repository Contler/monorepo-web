import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingBookingComponent } from './pending-booking.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PendingBokkingRoutingModule } from './pending-bookin-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    PendingBokkingRoutingModule,
    CommonComponentsModule,
    PipesModule,
    TranslateModule,
  ],
  declarations: [PendingBookingComponent],
})
export class PendingBookingModule {}
