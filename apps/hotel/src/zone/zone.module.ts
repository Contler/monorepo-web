import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneComponent } from './page/zone/zone.component';
import { ZoneRoutingModule } from './zone-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ZoneComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ZoneModule { }
