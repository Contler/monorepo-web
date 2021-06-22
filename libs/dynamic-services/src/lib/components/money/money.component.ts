import { Component, forwardRef, Input } from '@angular/core';
import { MONEY_OPTIONS } from '../../constants/money';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputField } from '../../interfaces/input-field';
import { MoneyInterface } from '../../interfaces/money-interface';

export interface MoneyValue {
  value: any;
  money: MoneyInterface;
}

@Component({
  selector: 'contler-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MoneyComponent), multi: true }],
})
export class MoneyComponent implements ControlValueAccessor {
  @Input() typeInput: InputField;

  readonly moneyOption = MONEY_OPTIONS;
  testValue = '';
  money = MONEY_OPTIONS[0];

  isDisable: boolean;
  onChange: (value: MoneyValue) => void;
  onTouch: () => void;
  moneyCompare = (o1: MoneyInterface, o2: MoneyInterface) => o1.symbol === o2.symbol;

  constructor() {}

  registerOnChange(fn: (value: MoneyValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }

  writeValue(value: MoneyValue): void {
    if (!!value) {
      this.money = value.money;
      this.testValue = value.value;
    }
  }

  update(value: number) {
    this.onChange({
      value,
      money: this.money,
    });
    this.onTouch();
  }

  updateMoney(money: MoneyInterface) {
    this.onChange({
      value: this.testValue,
      money,
    });
    this.onTouch();
  }
}
