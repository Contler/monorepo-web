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

const routes: Routes = [{ path: '', component: ReceptionComponent }];

@NgModule({
  declarations: [
    ReceptionComponent,
    TransportComponent,
    MoneyComponent,
    ExchangeComponent,
    ConciergeComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), IonicModule, MatIconModule, MatButtonModule],
})
export class ReceptionModule {}
