import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CleanComponent } from './clean.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { CleanRoutingModule } from './clean-routing.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: CleanComponent }];

@NgModule({
  declarations: [CleanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    MatIconModule,
    CommonComponentsModule,
    MatButtonModule,
    CommonComponentsModule,
    CleanRoutingModule,
    TranslateModule,
  ],
})
export class CleanModule {}
