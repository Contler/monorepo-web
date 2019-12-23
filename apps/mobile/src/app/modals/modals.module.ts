import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInmediateRequestPage } from './modal-inmediate-request/modal-inmediate-request.page';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalSpecialRequestPage } from './modal-special-request/modal-special-request.page';

@NgModule({
  declarations: [ModalInmediateRequestPage, ModalSpecialRequestPage],
  entryComponents: [ModalInmediateRequestPage, ModalSpecialRequestPage],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MaterialModule,
    FormsModule,
    IonicModule
  ]
})
export class ModalsModule {}
