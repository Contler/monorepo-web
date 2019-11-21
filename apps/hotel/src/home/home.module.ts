import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from 'hotel/home/home-routing.module';
import { AdminHomeComponent } from 'hotel/home/page/admin-home/admin-home.component';
import { MaterialModule } from 'hotel/material/material.module';
import { EmployerComponent } from './page/employer/employer.component';

@NgModule({
  declarations: [AdminHomeComponent, EmployerComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
