import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@contler/core';

import { ModalEmployerComponent } from './components/modal-employer/modal-employer.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './page/employer/employer.component';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { MaterialModule } from 'hotel/material/material.module';
import { ModalRemoveEmployerComponent } from './components/modal-remove-employer/modal-remove-employer.component';
import { ModalEditEmployerComponent } from './components/modal-edit-employer/modal-edit-employer.component';

@NgModule({
  declarations: [EmployerComponent, ModalEmployerComponent, ModalRemoveEmployerComponent, ModalEditEmployerComponent],
  entryComponents: [ModalEmployerComponent, ModalRemoveEmployerComponent, ModalEditEmployerComponent],
  imports: [CommonModule, EmployerRoutingModule, MaterialModule, FormsModule, CoreModule, ReactiveFormsModule],
  providers: [EmployerService],
})
export class EmployerModule {}
