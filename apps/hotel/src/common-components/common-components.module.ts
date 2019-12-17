import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIconComponent } from './status-icon/status-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'hotel/material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    StatusIconComponent,
    ToolbarComponent,
  ],
  exports: [
    StatusIconComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CommonComponentsModule { }
