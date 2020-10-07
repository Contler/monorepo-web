import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CleanComponent } from './clean.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { CommonComponentsModule } from '../../../../guest/src/common-components/common-components.module';
import { MatButtonModule } from '@angular/material/button';

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
  ],
})
export class CleanModule {}
