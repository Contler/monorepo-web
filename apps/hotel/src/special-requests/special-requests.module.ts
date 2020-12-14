import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialRequestsComponent } from './page/special-requests/special-requests.component';
import { SpecialRequestsRoutingModule } from './special-requests-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";



@NgModule({
  declarations: [SpecialRequestsComponent],
  imports: [
    CommonModule,
    SpecialRequestsRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    FormsModule,
    TranslateModule
  ]
})
export class SpecialRequestsModule { }
