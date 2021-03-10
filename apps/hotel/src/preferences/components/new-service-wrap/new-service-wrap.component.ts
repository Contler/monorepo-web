import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ModuleData } from '../../interfaces/module-data';
import { filter, first, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HotelEntity } from '@contler/entity';
import { AuthService } from 'hotel/services/auth.service';
import { DynamicModuleService, FormService, InputField } from '@contler/dynamic-services';
import { IconModel } from '@contler/models/icon.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@contler/dynamic-translate';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { ActivatedRoute } from '@angular/router';

export interface FormCreation {
  form: InputField[];
  name: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'contler-new-service-wrap',
  templateUrl: './new-service-wrap.component.html',
  styleUrls: ['./new-service-wrap.component.scss'],
})
export class NewServiceWrapComponent implements OnChanges {
  @Input() data: ModuleData;
  @Input() load: boolean;
  @Input() formService: FormService;
  @Output() create = new EventEmitter<FormCreation>();
  @Output() update = new EventEmitter<{ formCreation: FormCreation; formService: FormService }>();

  $hotel: Observable<HotelEntity>;
  icon: string = null;
  listOption: InputField[] = [];
  icons: Observable<IconModel[]>;

  formBasic: FormGroup;
  private keys: string[] = [];

  constructor(
    private afAuth: AuthService,
    private db: AngularFireDatabase,
    private formBuild: FormBuilder,
    private dynamicModuleService: DynamicModuleService,
    private translateService: TranslateService,
    private messagesService: MessagesService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.$hotel = this.afAuth.$hotel.pipe(take(1));
    this.icons = this.db.list<IconModel>('icons').valueChanges().pipe(take(1));
    this.formBasic = this.formBuild.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  addOption() {
    this.listOption = [
      ...this.listOption,
      {
        description: null,
        type: null,
      },
    ];
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('formService') && this.formService) {
      this.setIconFromQueryParams();
      this.setKeysDictionary();
      this.setDataFormServiceToForm();
      this.listOption = [...this.listOption, ...this.formService.form];
      this.formBasic.updateValueAndValidity();
    }
  }

  deleteInput(i: number) {
    this.listOption = this.listOption.filter((value, index) => index !== i);
  }

  reload() {
    this.listOption = [...this.listOption];
  }

  async sendData() {
    if (!this.formService) {
      this.create.emit({
        ...this.formBasic.value,
        form: this.listOption,
      });
    } else {
      this.update.emit({
        formCreation: {
          ...this.formBasic.value,
          form: this.listOption,
        },
        formService: this.formService,
      });
    }
  }

  private setIconFromQueryParams(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        map((params) => params.get('icon')),
        filter((icon) => !!icon),
        first(),
      )
      .subscribe((icon) => {
        this.formBasic.get('icon').setValue(icon);
      });
  }

  private setKeysDictionary(): void {
    const keys = this.formService.form.map((form) => {
      if (!form.option) {
        form.option = [];
      }
      return [form.description, ...form.option];
    });
    this.keys = [...[].concat.apply([], keys), this.formService.serviceName, this.formService.title];
  }

  private setDataFormServiceToForm(): void {
    this.translateService
      .getTranslate(this.keys)
      .pipe(first())
      .subscribe((values) => {
        if (values.hasOwnProperty(this.formService.serviceName)) {
          this.formService.serviceName = values[this.formService.serviceName];
        }
        if (values.hasOwnProperty(this.formService.title)) {
          this.formService.title = values[this.formService.title];
        }
        this.formBasic.get('name').setValue(this.formService.serviceName);
        this.formBasic.get('description').setValue(this.formService.title);
        this.formService.form = this.formService.form.map((form) => {
          if (values.hasOwnProperty(form.description)) {
            form.description = values[form.description];
          }
          if (form.option) {
            form.option = form.option.map((option) => {
              if (values.hasOwnProperty(option)) {
                option = values[option];
              }
              return option;
            });
            return form;
          }
        });
      });
  }
}
