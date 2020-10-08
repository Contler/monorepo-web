import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIconComponent } from './status-icon/status-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'hotel/material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ModalEditEmployerComponent } from 'hotel/common-components/modal-edit-employer/modal-edit-employer.component';
import { CoreModule } from '@contler/core';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { ModalInmediateRequestComponent } from 'hotel/common-components/modal-inmediate-request/modal-inmediate-request.component';
import { RatingModule } from 'ng-starrating';
import { MarcoAdminComponent } from './marco-admin/marco-admin.component';
import { UiModule } from '@contler/ui';

@NgModule({
  declarations: [
    StatusIconComponent,
    ToolbarComponent,
    ModalEditEmployerComponent,
    ModalInmediateRequestComponent,
    MarcoAdminComponent,
  ],
  entryComponents: [ModalEditEmployerComponent, ModalInmediateRequestComponent],
  exports: [StatusIconComponent, ToolbarComponent, ModalInmediateRequestComponent, MarcoAdminComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RatingModule,
    UiModule,
  ],
  providers: [InmediateRequestsService],
})
export class CommonComponentsModule {}
