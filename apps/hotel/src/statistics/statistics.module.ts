import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { CommonComponentsModule } from 'hotel/common-components/common-components.module';
import { MaterialModule } from 'hotel/material/material.module';
import { CardEmployeesComponent } from './components/card-employees/card-employees.component';


@NgModule({
  declarations: [StatisticsComponent, CardEmployeesComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    CommonComponentsModule,
    MaterialModule,
  ]
})
export class StatisticsModule { }