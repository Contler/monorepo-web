import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingComponent } from './pending.component';
import { PendingRoutingModule } from './pending-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { MaterialModule } from '../../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentsModule,
    PendingRoutingModule,
    MaterialModule,
    TranslateModule,
  ],
  declarations: [PendingComponent],
})
export class PendingModule {}
