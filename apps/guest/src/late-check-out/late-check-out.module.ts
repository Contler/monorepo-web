import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LateCheckOutRoutingModule } from './late-check-out-routing.module';
import { LateCheckOutComponent } from './late-check-out.component';
import { CommonComponentsModule } from 'guest/common-components/common-components.module';
import { MaterialModule } from 'guest/material/material.module';
import { CreateLateComponent } from './modal/create-late/create-late.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';


@NgModule({
  declarations: [LateCheckOutComponent, CreateLateComponent],
  imports: [
    CommonModule,
    LateCheckOutRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    FormsModule,
    CoreModule,
  ],
  entryComponents: [CreateLateComponent],
})
export class LateCheckOutModule { }
