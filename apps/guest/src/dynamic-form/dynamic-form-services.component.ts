import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DynamicFormComponent,
  DynamicModuleService,
  DynamicRequest,
  DynamicRequestStatus,
  FormService,
  InputType,
  MODULES,
} from '@contler/dynamic-services';
import { FormGroup } from '@angular/forms';
import { GuestService } from '../services/guest.service';
import { take } from 'rxjs/operators';
import { GuestEntity } from '@contler/entity';
import { Location } from '@angular/common';
import { ReceptionService, RoomService, TranslateService } from '@contler/core';
import { getLan } from '@contler/const';

@Component({
  selector: 'contler-dynamic-form-service',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormServicesComponent implements OnInit {
  @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;

  private module: MODULES;
  private idService: string;
  private guest: GuestEntity;

  load = true;
  formData: FormService;
  formGroup: FormGroup;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private dynamicService: DynamicModuleService,
    private auth: GuestService,
    private location: Location,
    private reception: ReceptionService,
    private room: RoomService,
    private dynTranslate: TranslateService,
  ) {
    this.route.params.subscribe((params) => {
      this.module = params['module'];
      this.idService = params['idService'];
      this.loadForm();
    });
  }

  ngOnInit(): void {
    this.auth.$guest.pipe(take(1)).subscribe((user) => (this.guest = user));
  }

  private loadForm() {
    this.dynamicService.getFormData(this.idService).subscribe((data) => {
      this.formData = data;
      setTimeout(() => (this.load = false));
    });
  }

  async saveForm() {
    this.loading = true;
    let formClone = [...this.formData.form];
    const promisesToExecute = formClone.map(async (input, index) => {
      const key = `inp-type-${input.type}-${index}`;
      let value = this.dynamicForm.form.value[key];
      if (
        (input.type === InputType.SELECT_WITH_OTHER && !input.option.includes(value)) ||
        input.type === InputType.TEXT
      ) {
        const [actualLan, languages] = getLan();
        const trans = await this.dynTranslate
          .generateUrl({
            actualLan,
            languages,
            hotel: this.guest.hotel.uid,
            mgs: value,
            url: `${this.module}Module/${this.idService}/optionFile`,
          })
          .toPromise();
        value = trans.key;
      }
      input.value = input.type === InputType.DATE || input.type === InputType.TIME ? value.toString() : value;
      return input;
    });
    formClone = await Promise.all(promisesToExecute);
    const data: DynamicRequest = {
      form: formClone,
      nameService: this.formData.serviceName,
      service: this.module,
      guest: this.guest,
      guestId: this.guest.uid,
      hotelId: this.guest.hotel.uid,
      active: true,
      status: DynamicRequestStatus.PROGRAMING,
      createAt: new Date(),
    };
    this.dynamicService.saveDynamicRequest(data).then(() => {
      switch (this.module) {
        case MODULES.reception:
          this.reception.sendNotification(this.guest.hotel.uid);
          break;
        case MODULES.room:
          this.room.sendNotification(this.guest.hotel.uid);
          break;
        case MODULES.maintenance:
          this.room.sendNotificationMaintain(this.guest.hotel.uid);
          break;
        case MODULES.cleaning:
          this.room.sendNotificationCleaning(this.guest.hotel.uid);
          break;
      }
      this.location.back();
    });
  }
}
