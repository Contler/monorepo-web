import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputField } from '../../interfaces/input-field';

@Component({
  selector: 'contler-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextInputComponent), multi: true }],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() typeInput: InputField;
  data: string;
  onChange: (data: string) => void;
  onTouch: () => void;
  isDisabled: boolean;

  public registerOnChange(fn: (data: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  public writeValue(obj: any): void {}

  public setValueFromFieldOther(value: string): void {
    this.onChange(value);
    this.onTouch();
  }

  get typeValue(): string {
    return this.typeInput?.value as string;
  }
}
