import { Component, forwardRef, Input } from '@angular/core';
import { InputField } from '../../interfaces/input-field';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'contler-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateInputComponent), multi: true }],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() typeInput: InputField;

  data: Date;
  onChange: (date: Date) => void;
  onTouch: () => void;
  isDisabled: boolean;

  constructor() {}

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
      this.data = obj !== '' ? new Date(obj) : null;
    } else {
      this.data = obj;
    }
  }

  change(change: Date) {
    this.onChange(change);
    this.onTouch();
  }
}
