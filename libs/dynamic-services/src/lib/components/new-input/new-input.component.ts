import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OPTION_INPUTS } from '../../constants/option-inputs';
import { InputField } from '../../interfaces/input-field';

@Component({
  selector: 'contler-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss'],
})
export class NewInputComponent implements OnInit {
  @Input() inputData: InputField;
  @Output() delete = new EventEmitter();

  readonly inputOptions = OPTION_INPUTS;

  constructor() {}

  ngOnInit(): void {}

  addOption(value: string) {
    if (!this.inputData.option) {
      this.inputData.option = [];
    }
    this.inputData.option.push(value);
  }

  removeOption(i: number) {
    this.inputData.option = this.inputData.option.filter((value, index) => index !== i);
  }

  removeField() {
    this.delete.emit();
  }
}
