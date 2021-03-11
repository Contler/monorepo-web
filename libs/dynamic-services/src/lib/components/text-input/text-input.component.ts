import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { InputField } from '@contler/dynamic-services';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  public setValueFromFieldOther($event: Event): void {
    // @ts-ignore
    this.onChange($event.target.value);
  }
}
