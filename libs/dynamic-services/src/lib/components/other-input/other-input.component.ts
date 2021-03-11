import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputField } from '@contler/dynamic-services';

@Component({
  selector: 'contler-other-input',
  templateUrl: './other-input.component.html',
  styleUrls: ['./other-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => OtherInputComponent), multi: true },
  ],
})
export class OtherInputComponent implements ControlValueAccessor {
  @Input() typeInput: InputField;
  data: string;
  onChange: (data: string) => void;
  onTouch: () => void;
  isDisabled: boolean;
  isOther = false;
  isOptionForm: string;
  isOtherForm: string;

  public registerOnChange(fn: (data: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public writeValue(option: string): void {
    if (option) {
      if (this.typeInput.option.includes(option)) {
        this.isOptionForm = option;
      } else {
        this.isOptionForm = this.typeInput.option[this.typeInput.option.length - 1];
        this.isOtherForm = option;
        this.isOther = true;
      }
    }
  }

  public changeSelect(option: string): void {
    const last = this.typeInput.option[this.typeInput.option.length - 1];
    if (last === option) {
      this.isOther = true;
    } else {
      this.isOther = false;
      this.onChange(option);
    }
  }

  public setValueFromFieldOther(event: Event): void {
    // @ts-ignore
    this.onChange(event.target.value);
  }
}
