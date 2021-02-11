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
import { ZoneService } from 'hotel/zone/services/zone.service';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';

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
