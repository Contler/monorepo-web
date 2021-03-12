import { Component, forwardRef, Input } from '@angular/core';
import { fullRangeDates } from '../../utils/rangeTime';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputField } from '../../interfaces/input-field';

@Component({
  selector: 'contler-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeInputComponent), multi: true }],
})
export class TimeInputComponent implements ControlValueAccessor {
  @Input() typeInput: InputField;

  readonly hoursOptions = fullRangeDates();
  value: Date;
  onChange: (date: Date) => void;
  onTouch: () => void;
  isDisabled: boolean;
  compareTime = (t1: Date, t2: Date) => t1.getTime() === t2.getTime();

  constructor() {
    const timeActual = new Date();
    timeActual.setMinutes(0);
    timeActual.setSeconds(0);
    timeActual.setMilliseconds(0);
    this.value = this.hoursOptions.find((d) => d.getTime() === timeActual.getTime());
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: Date | string): void {
    if (typeof obj === 'string') {
      this.value = obj !== '' ? this.convertDate(new Date(obj)) : this.value;
    } else if (!!obj) {
      this.value = this.convertDate(obj);
    }
    console.log(this.value);
  }

  convertDate(date: Date) {
    const timeActual = new Date();
    timeActual.setMinutes(date.getMinutes());
    timeActual.setSeconds(date.getSeconds());
    timeActual.setMilliseconds(date.getMilliseconds());
    timeActual.setHours(date.getHours());
    return timeActual;
  }

  change(change: Date) {
    this.onChange(change);
    this.onTouch();
  }
}
