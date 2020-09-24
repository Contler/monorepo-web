import { Component } from '@angular/core';
import { MONEY_OPTIONS } from '../../const/exchange.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent {
  readonly moneyOptions = MONEY_OPTIONS;

  changeForm: FormGroup;

  constructor(formBuild: FormBuilder) {
    this.changeForm = formBuild.group({
      money: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  save() {
    console.log('save');
  }
}
