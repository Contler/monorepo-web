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
      this.form.addControl(
        `inp-type-${value.type}-${index}`,
        new FormControl(value.value, Validators.required),
      );
      if (this.readOnly) {
        this.form.get(`inp-type-${value.type}-${index}`).disable();
      }
    });
  }

  getControl(type: number, index: number) {
    return this.form.get(`${this.generateName(type, index)}`);
  }

  generateName(type: number, index: number) {
    return `inp-type-${type}-${index}`;
  }
}
