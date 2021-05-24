import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WakeUpRoutingModule } from './wake-up-routing.module';
import { WakeUpComponent } from './wake-up.component';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [WakeUpComponent],
  imports: [
    CommonModule,
    WakeUpRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    FormsModule,
    TranslateModule,
    DirectivesModule,
  ],
  providers: [DatePipe],
})
export class WakeUpModule {}
