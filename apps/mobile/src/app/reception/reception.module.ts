import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReceptionRoutingModule } from './reception-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PendingComponent } from './pages/pending-reception/pending.component';

const routes: Routes = [{ path: '', component: ReceptionComponent }];

@NgModule({
  declarations: [ReceptionComponent, PendingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    MatIconModule,
    MatButtonModule,
    CommonComponentsModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReceptionRoutingModule,
    TranslateModule,
  ],
})
export class ReceptionModule {}
