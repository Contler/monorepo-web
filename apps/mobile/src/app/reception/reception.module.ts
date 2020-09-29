import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReceptionComponent } from './reception.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TransportComponent } from './components/transport/transport.component';
import { MoneyComponent } from './components/money/money.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ConciergeComponent } from './components/concierge/concierge.component';
import { RequestReceptionComponent } from './modals/request-reception/request-reception.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReceptionLocalService } from './services/reception/reception-local.service';

const routes: Routes = [{ path: '', component: ReceptionComponent }];

@NgModule({
  declarations: [
    ReceptionComponent,
    TransportComponent,
    MoneyComponent,
    ExchangeComponent,
    ConciergeComponent,
    RequestReceptionComponent,
  ],
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
