import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadyComponent } from './ready.component';
import { ReadyRoutingModule } from './ready-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { CommonComponentsModule } from '../../../common-components/common-components.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadyRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    TranslateModule,
  ],
  declarations: [ReadyComponent],
})
export class ReadyModule {}
