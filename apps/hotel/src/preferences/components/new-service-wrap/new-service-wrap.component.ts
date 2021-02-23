import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModuleData } from '../../interfaces/module-data';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HotelEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { InputField } from '@contler/dynamic-services';
import { IconModel } from '@contler/models/icon.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class NewServiceWrapComponent implements OnInit {
  @Input() data: ModuleData;
  @Input() load: boolean;
  @Output() create = new EventEmitter<FormCreation>();

  $hotel: Observable<HotelEntity>;

  listOption: InputField[] = [];
  icons: Observable<IconModel[]>;

  formBasic: FormGroup;

  constructor(private afAuth: AuthService, private db: AngularFireDatabase, private formBuild: FormBuilder) {
    this.$hotel = this.afAuth.$employer.pipe(
      take(1),
      map((user) => user.hotel),
    );
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

  ngOnInit(): void {}

  deleteInput(i: number) {
    this.listOption = this.listOption.filter((value, index) => index !== i);
  }

  reload() {
    this.listOption = [...this.listOption];
  }

  sendData() {
    this.create.emit({
      ...this.formBasic.value,
      form: this.listOption,
    });
  }
}
