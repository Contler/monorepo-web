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
import { ReceptionService, RoomService } from '@contler/core';

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

  saveForm() {
    this.loading = true;
    const formClone = [...this.formData.form];
    formClone.forEach((input, index) => {
      const key = `inp-type-${input.type}-${index}`;
      const value = this.dynamicForm.form.value[key];
      input.value = input.type === InputType.DATE ? value.toString() : value;
    });
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
      }
      this.location.back();
    });
  }
}
