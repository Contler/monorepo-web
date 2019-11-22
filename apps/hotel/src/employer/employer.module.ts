import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'hotel/material/material.module';
import { ModalEmployerComponent } from './components/modal-employer/modal-employer.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './page/employer/employer.component';
import { CoreModule } from '@contler/core';


@NgModule({
  declarations: [EmployerComponent, ModalEmployerComponent ],
  entryComponents: [ModalEmployerComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
  ],
})
export class EmployerModule { }
