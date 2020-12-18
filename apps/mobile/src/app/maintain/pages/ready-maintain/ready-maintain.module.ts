import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyMaintainComponent } from './ready-maintain.component';
import { ReadyMaintainRoutingModule } from './ready-routin.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { MaterialModule } from '../../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonComponentsModule,
    ReadyMaintainRoutingModule,
    MaterialModule,
    TranslateModule,
  ],
  declarations: [ReadyMaintainComponent],
})
export class ReadyMaintainModule {}
