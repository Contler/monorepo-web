import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UiModule } from '@contler/ui';
import { MatIconModule } from '@angular/material/icon';
import { TransportationComponent } from './components/transportation/transportation.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ReceptionComponent, TransportationComponent],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    CommonComponentsModule,
    UiModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
})
export class ReceptionModule {}
