import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@contler/core';

import { ModalEmployerComponent } from './components/modal-employer/modal-employer.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './page/employer/employer.component';
import { ModalRemoveEmployerComponent } from './components/modal-remove-employer/modal-remove-employer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';
import { MaterialModule } from '../material/material.module';
import { EmployerService } from './services/employer.service';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { ZoneService } from '../zone/services/zone.service';

@NgModule({
  declarations: [EmployerComponent, ModalEmployerComponent, ModalRemoveEmployerComponent],
  entryComponents: [ModalEmployerComponent, ModalRemoveEmployerComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    RouterModule,
    TranslateModule,
    DirectivesModule,
  ],
  providers: [EmployerService, ZoneService],
})
export class EmployerModule {}
