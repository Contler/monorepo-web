import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WakeUpRoutingModule } from './wake-up-routing.module';
import { WakeUpComponent } from './wake-up.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [WakeUpComponent],
  imports: [
    CommonModule,
    WakeUpRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    FormsModule,
    TranslateModule
  ],
  providers: [DatePipe]
})
export class WakeUpModule { }
