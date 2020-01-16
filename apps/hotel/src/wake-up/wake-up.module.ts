import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WakeUpRoutingModule } from './wake-up-routing.module';
import { WakeUpComponent } from './wake-up.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [WakeUpComponent],
  imports: [
    CommonModule,
    WakeUpRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class WakeUpModule { }
