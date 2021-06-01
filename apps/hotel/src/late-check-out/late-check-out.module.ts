import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LateCheckOutRoutingModule } from './late-check-out-routing.module';
import { LateCheckOutComponent } from './late-check-out.component';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { CoreModule } from '@contler/core';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [LateCheckOutComponent],
  imports: [
    CommonModule,
    LateCheckOutRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    CoreModule,
    TranslateModule,
    DirectivesModule,
  ],
  providers: [DatePipe],
})
export class LateCheckOutModule {}
