import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OPTION_INPUTS } from '../../constants/option-inputs';
import { InputField, InputType } from '../../interfaces/input-field';
import { TranslateService } from '@ngx-translate/core';
import { first, startWith } from 'rxjs/operators';
import { MONEY_OPTIONS } from '../../constants/money';
import { SpecialZoneGuest } from '@contler/models';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { GetLinkPipe } from '../../pipes/get-link.pipe';

@Component({
  selector: 'contler-new-input',
  templateUrl: './new-input.component.html',
  styleUrls: ['./new-input.component.scss'],
  providers: [GetLinkPipe],
})
export class NewInputComponent implements OnInit {
  @Output() delete = new EventEmitter();
  @Output() disabledAddOption = new EventEmitter<boolean>();
  @Input() inputData: InputField;
  @Input() specialZoneGuest: SpecialZoneGuest[] | null;

  readonly inputOptions = OPTION_INPUTS;
  readonly moneyOption = MONEY_OPTIONS;
  InputType = InputType;
  showExternUrl = false;
  externUrlControl: FormControl = new FormControl();
  externUrlNameControl: FormControl = new FormControl();

  constructor(private translateService: TranslateService, private getLinkPipe: GetLinkPipe) {}

  ngOnInit(): void {
    if (this.inputData.value === 'extern') {
      this.showExternUrl = true;
      this.externUrlControl.setValue(this.getLinkPipe.transform(this.inputData.description, true));
      this.externUrlNameControl.setValue(this.getLinkPipe.transform(this.inputData.description, false));
    }
    combineLatest([
      this.externUrlControl.valueChanges.pipe(
        startWith(this.getLinkPipe.transform(this.inputData.description, true)),
      ),
      this.externUrlNameControl.valueChanges.pipe(
        startWith(this.getLinkPipe.transform(this.inputData.description, false)),
      ),
    ]).subscribe(([url, name]) => {
      this.inputData.description = `${name}|${url}`;
    });
  }

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

  public async changeInputData(inputType: InputType): Promise<void> {
    this.disabledAddOption.emit(false);
    switch (inputType) {
      case InputType.SELECT_WITH_OTHER:
        const other = await this.translateService
          .get('preferences.optionInputs.other')
          .pipe(first())
          .toPromise();
        this.addOption(other);
        break;
      case InputType.MONEY:
        this.inputData.money = {
          money: this.moneyOption[0],
          staticMoney: true,
          nameSelect: '',
        };
        break;
      case InputType.SELECT:
        this.inputData.option = [];
        break;
      case InputType.URL:
        this.disabledAddOption.emit(true);
        break;
    }
  }

  public onChangeInputTypeUrl($event: any): void {
    this.showExternUrl = $event === 'extern';
  }
}
