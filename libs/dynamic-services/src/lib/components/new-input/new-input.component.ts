import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OPTION_INPUTS } from '../../constants/option-inputs';
import { InputField, InputType } from '../../interfaces/input-field';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'contler-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss'],
})
export class NewInputComponent implements OnInit {
  @Input() inputData: InputField;
  @Output() delete = new EventEmitter();

  readonly inputOptions = OPTION_INPUTS;
  InputType = InputType;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  addOption(value: string) {
    if (!this.inputData.option) {
      this.inputData.option = [];
    }
    this.inputData.option.unshift(value);
  }

  removeOption(i: number) {
    this.inputData.option = this.inputData.option.filter((value, index) => index !== i);
  }

  removeField() {
    this.delete.emit();
  }

  public async changeInputData(inputType: number): Promise<void> {
    if (inputType === this.InputType.SELECT_WITH_OTHER) {
      const other = await this.translateService
        .get('preferences.optionInputs.other')
        .pipe(first())
        .toPromise();
      this.addOption(other);
    }
  }
}
