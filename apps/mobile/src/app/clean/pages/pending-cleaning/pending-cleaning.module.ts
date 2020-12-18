import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingCleaningComponent } from './pending-cleaning.component';
import { PendingCleaningRoutinModule } from './pending-routing.module';
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
    PendingCleaningRoutinModule,
    MaterialModule,
    TranslateModule,
  ],
  declarations: [PendingCleaningComponent],
})
export class PendingCleaningModule {}
