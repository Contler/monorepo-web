import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIconComponent } from './status-icon/status-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'hotel/material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ModalEditEmployerComponent } from 'hotel/common-components/modal-edit-employer/modal-edit-employer.component';
import { CoreModule } from '@contler/core';

@NgModule({
  declarations: [
    StatusIconComponent,
    ToolbarComponent,
    ModalEditEmployerComponent
  ],
  entryComponents: [ModalEditEmployerComponent],
  exports: [
    StatusIconComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class CommonComponentsModule { }
