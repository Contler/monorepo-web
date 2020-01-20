import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic.component';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CardEmployeesComponent } from './components/card-employees/card-employees.component';

const routes: Routes = [
  { path: '', component: StatisticComponent }
];

@NgModule({
  declarations: [StatisticComponent, CardEmployeesComponent],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    RouterModule.forChild(routes),
    IonicModule,
    MaterialModule,
    FormsModule,
  ],
})
export class StatisticModule { }
