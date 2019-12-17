import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIconComponent } from './status-icon/status-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'hotel/material/material.module';

@NgModule({
  declarations: [
    StatusIconComponent,
  ],
  exports: [
    StatusIconComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CommonComponentsModule { }
