import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputField, InputType } from '../../interfaces/input-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@contler/dynamic-translate';

@Component({
  selector: 'contler-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() listInputs: InputField[] = [];
  @Input() readOnly = false;

  form: FormGroup;
  public showWhich = false;

  constructor(private formBuild: FormBuilder, private translateService: TranslateService) {
    this.form = formBuild.group({});
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.formBuild.group({});
    this.listInputs.forEach((value, index) => {
      if (
        value.type === InputType.SELECT_WITH_OTHER &&
        value.value &&
        value.option.includes(value.value.toString())
      ) {
        this.form.addControl(
          `inp-type-${value.type}-${index}`,
          new FormControl(value.value, Validators.required),
        );
        this.form.addControl(
          `inp-type-${value.type}-${index}-fake`,
          new FormControl(value.value, Validators.required),
        );
      } else if (
        value.type === InputType.SELECT_WITH_OTHER &&
        value.value &&
        !value.option.includes(value.value.toString())
      ) {
        this.showWhich = true;
        const other = value.option[value.option.length - 1];
        this.form.addControl(
          `inp-type-${value.type}-${index}-fake`,
          new FormControl(other, Validators.required),
        );
        const valueForm = this.translateService.getInstant(value.value.toString());
        this.form.addControl(
          `inp-type-${value.type}-${index}`,
          new FormControl(valueForm, Validators.required),
        );
      } else if (value.type === InputType.SELECT_WITH_OTHER && !value.value) {
        this.form.addControl(`inp-type-${value.type}-${index}`, new FormControl('', Validators.required)),
          this.form.addControl(
            `inp-type-${value.type}-${index}-fake`,
            new FormControl('', Validators.required),
          );
      } else if (value.type !== InputType.SELECT_WITH_OTHER) {
        this.form.addControl(
          `inp-type-${value.type}-${index}`,
          new FormControl(value.value, Validators.required),
        );
      }
      if (this.readOnly) {
        this.form.get(`inp-type-${value.type}-${index}`).disable();
        if (value.type === InputType.SELECT_WITH_OTHER) {
          this.form.get(`inp-type-${value.type}-${index}-fake`).disable();
        }
      }
    });
  }

  getControl(type: number, index: number, suffix: string = '') {
    return this.form.get(`${this.generateName(type, index)}${suffix}`);
  }

  generateName(type: number, index: number) {
    return `inp-type-${type}-${index}`;
  }

  public changeSelectWithOther(options: string[], option: string, inputType: InputType, index: number): void {
    const last = options[options.length - 1];
    this.showWhich = last === option;
    if (this.showWhich) {
      this.getControl(inputType, index).setValue('');
    } else {
      this.getControl(inputType, index).setValue(option);
    }
  }
}
