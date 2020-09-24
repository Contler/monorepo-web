import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxCurrencyModule } from 'ngx-currency';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UiModule } from '@contler/ui';
import { MatIconModule } from '@angular/material/icon';
import { TransportationComponent } from './pages/transportation/transportation.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@contler/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CashLoanComponent } from './pages/cash-loan/cash-loan.component';

@NgModule({
  declarations: [ReceptionComponent, TransportationComponent, CashLoanComponent],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    CommonComponentsModule,
    UiModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    CoreModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxCurrencyModule,
  ],
})
export class ReceptionModule {}