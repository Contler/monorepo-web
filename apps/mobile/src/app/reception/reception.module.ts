import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RequestReceptionComponent } from './modals/request-reception/request-reception.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReceptionLocalService } from './services/reception/reception-local.service';
import { ReceptionItemComponent } from './components/reception-item/reception-item.component';

const routes: Routes = [{ path: '', component: ReceptionComponent }];

@NgModule({
  declarations: [ReceptionComponent, RequestReceptionComponent, ReceptionItemComponent],
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
  ],
  providers: [ReceptionLocalService],
})
export class ReceptionModule {}
