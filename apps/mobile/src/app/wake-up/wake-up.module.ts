import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WakeUpRoutingModule } from './wake-up-routing.module';
import { WakeUpComponent } from './wake-up.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';
import { WakePendingComponent } from './pages/wake-pending/wake-pending.component';
import { WakeComponent } from './components/wake/wake.component';
import { WakeSearchPipe } from './pipes/wake-search.pipe';
import { FormsModule } from '@angular/forms';
import { ModalConfirmWakeComponent } from './components/modal-confirm-wake/modal-confirm-wake.component';
import { WakeCompleteComponent } from './pages/wake-complete/wake-complete.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

const routes: Routes = [{ path: '', component: WakeUpComponent }];

@NgModule({
  declarations: [
    WakeUpComponent,
    WakePendingComponent,
    WakeComponent,
    WakeSearchPipe,
    ModalConfirmWakeComponent,
    WakeCompleteComponent,
  ],
  imports: [
    CommonModule,
    WakeUpRoutingModule,
    RouterModule.forChild(routes),
    IonicModule,
    MaterialModule,
    FormsModule,
    CommonComponentsModule,
  ],
  providers: [DatePipe],
  entryComponents: [ModalConfirmWakeComponent],
})
export class WakeUpModule {}
