import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaintainComponent } from './maintain.component';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MaintainRoutingModule } from './maintain-routing.module';

const routes: Routes = [{ path: '', component: MaintainComponent }];

@NgModule({
  declarations: [MaintainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    MatButtonModule,
    MatIconModule,
    CommonComponentsModule,
    MaintainRoutingModule,
  ],
})
export class MaintainModule {}
