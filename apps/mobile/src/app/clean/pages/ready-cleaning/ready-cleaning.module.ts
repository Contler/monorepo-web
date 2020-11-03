import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyCleaningComponent } from './ready-cleaning.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { MaterialModule } from '../../../material/material.module';
import { ReadyCleaningRoutingModule } from './ready-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentsModule,
    MaterialModule,
    ReadyCleaningRoutingModule,
  ],
  declarations: [ReadyCleaningComponent],
})
export class ReadyCleaningModule {}
