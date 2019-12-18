import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialRequestsComponent } from './page/special-requests/special-requests.component';
import { SpecialRequestsRoutingModule } from './special-requests-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SpecialRequestsComponent],
  imports: [
    CommonModule,
    SpecialRequestsRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    FormsModule
  ]
})
export class SpecialRequestsModule { }
