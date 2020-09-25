import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashLoanComponent } from './pages/cash-loan/cash-loan.component';

import { ReceptionComponent } from './reception.component';
import { TransportationComponent } from './pages/transportation/transportation.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { ConciergeComponent } from './pages/concierge/concierge.component';

const routes: Routes = [
  { path: '', component: ReceptionComponent },
  { path: 'transportation', component: TransportationComponent },
  { path: 'cash', component: CashLoanComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'concierge', component: ConciergeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}
