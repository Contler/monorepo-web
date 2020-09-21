import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UiModule } from '@contler/ui';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReceptionComponent],
  imports: [CommonModule, ReceptionRoutingModule, CommonComponentsModule, UiModule, MatIconModule],
})
export class ReceptionModule {}
