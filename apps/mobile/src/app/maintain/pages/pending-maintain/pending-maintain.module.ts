import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingMaintainComponent } from './pending-maintain.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { MaterialModule } from '../../../material/material.module';
import { PendingMaintainRoutingModule } from './pending-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentsModule,
    PendingMaintainRoutingModule,
    MaterialModule,
  ],
  declarations: [PendingMaintainComponent],
})
export class PendingMaintainModule {}
