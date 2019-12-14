import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmediateRequestsComponent } from './page/inmediate-requests/inmediate-requests.component';
import { InmediateRequestsRoutingModule } from './inmediate-requests-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { CoreModule } from '@contler/core';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';



@NgModule({
  declarations: [InmediateRequestsComponent],
  imports: [
    CommonModule,
    InmediateRequestsRoutingModule,
    MaterialModule,
    CoreModule,
    CommonComponentsModule
  ]
})
export class InmediateRequestsModule { }
