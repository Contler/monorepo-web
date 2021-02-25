import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InmediateRequestsComponent } from './page/inmediate-requests/inmediate-requests.component';
import { InmediateRequestsRoutingModule } from './inmediate-requests-routing.module';
import { MaterialModule } from 'hotel/material/material.module';
import { CoreModule } from '@contler/core';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { RequestComponent } from './components/request/request.component';
import { ReceptionRequestComponent } from './components/reception-request/reception-request.component';
import { MatSortModule } from '@angular/material/sort';
import { ModalReceptionComponent } from './components/modal-reception/modal-reception.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicTranslateModule } from '@contler/dynamic-translate';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [InmediateRequestsComponent, RequestComponent, ReceptionRequestComponent],
  entryComponents: [],
  imports: [
    CommonModule,
    InmediateRequestsRoutingModule,
    MaterialModule,
    CoreModule,
    CommonComponentsModule,
    FormsModule,
    RatingModule,
    MatSortModule,
    MatDialogModule,
    TranslateModule,
    DynamicTranslateModule,
    DirectivesModule,
  ],
  providers: [EmployerService],
})
export class InmediateRequestsModule {}
