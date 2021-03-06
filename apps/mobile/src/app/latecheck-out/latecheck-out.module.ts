import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LatecheckOutRoutingModule } from './latecheck-out-routing.module';
import { LatecheckOutComponent } from './latecheck-out.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@contler/core';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: LatecheckOutComponent }];

@NgModule({
  declarations: [LatecheckOutComponent],
  imports: [
    CommonModule,
    LatecheckOutRoutingModule,
    RouterModule.forChild(routes),
    IonicModule,
    MaterialModule,
    FormsModule,
    CoreModule,
    CommonComponentsModule,
    TranslateModule,
  ],
})
export class LatecheckOutModule {}
