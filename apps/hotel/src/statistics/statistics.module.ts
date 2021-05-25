import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { CommonComponentsModule } from '@contler/hotel/common-components/common-components.module';
import { MaterialModule } from '@contler/hotel/material/material.module';
import { CardEmployeesComponent } from './components/card-employees/card-employees.component';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [StatisticsComponent, CardEmployeesComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    CommonComponentsModule,
    MaterialModule,
    TranslateModule,
    DirectivesModule,
  ],
})
export class StatisticsModule {}
