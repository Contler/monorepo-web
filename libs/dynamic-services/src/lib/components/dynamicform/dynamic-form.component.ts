import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputField } from '../../interfaces/input-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() listInputs: InputField[] = [];
  form: FormGroup;

  constructor(private formBuild: FormBuilder) {
    this.form = formBuild.group({});
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.form = this.formBuild.group({});
    this.listInputs.forEach((value, index) => {
      this.form.addControl(`inp-type-${value.type}-${index}`, new FormControl('', Validators.required));
    });
  }

  getControl(type: number, index: number) {
    return this.form.get(this.generateName(type, index));
  }

  generateName(type: number, index: number) {
    return `inp-type-${type}-${index}`;
  }
}
