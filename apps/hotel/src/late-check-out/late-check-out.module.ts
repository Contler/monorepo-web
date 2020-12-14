import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LateCheckOutRoutingModule } from './late-check-out-routing.module';
import { LateCheckOutComponent } from './late-check-out.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { CoreModule } from '@contler/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LateCheckOutComponent],
  imports: [
    CommonModule,
    LateCheckOutRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    CoreModule,
    TranslateModule,
  ],
  providers: [DatePipe],
})
export class LateCheckOutModule {}
