import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'contler-cash-loan',
  templateUrl: './cash-loan.component.html',
  styleUrls: ['./cash-loan.component.scss'],
})
export class CashLoanComponent {
  cashControl = new FormControl('1', Validators.required);

  constructor() {}
}
