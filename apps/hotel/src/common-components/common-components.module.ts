import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIconComponent } from './status-icon/status-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CoreModule } from '@contler/core';
import { RatingModule } from 'ng-starrating';
import { MarcoAdminComponent } from './marco-admin/marco-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { UiModule } from '@contler/ui';
import { DirectivesModule } from '../directives/directives.module';
import { ModalReceptionComponent } from './modal-reception/modal-reception.component';
import { DynamicServicesModule } from '@contler/dynamic-services';
import { ModalEditEmployerComponent } from './modal-edit-employer/modal-edit-employer.component';
import { ModalInmediateRequestComponent } from './modal-inmediate-request/modal-inmediate-request.component';
import { MaterialModule } from '../material/material.module';
import { InmediateRequestsService } from '../inmediate-requests/services/inmediate-requests.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LoaderComponent } from './modal-loader/loader.component';

@NgModule({
  declarations: [
    StatusIconComponent,
    ToolbarComponent,
    ModalEditEmployerComponent,
    ModalInmediateRequestComponent,
    MarcoAdminComponent,
    ModalReceptionComponent,
    LoaderComponent,
  ],
  exports: [
    StatusIconComponent,
    ToolbarComponent,
    ModalInmediateRequestComponent,
    MarcoAdminComponent,
    ModalReceptionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    RatingModule,
    TranslateModule,
    DynamicTranslateModule,
    UiModule,
    DirectivesModule,
    DynamicServicesModule,
    MatDialogModule,
  ],
  providers: [InmediateRequestsService],
})
export class CommonComponentsModule {}
