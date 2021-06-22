import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RECEPTION_STATUS } from '@contler/const';
import {
  AbstractRequest,
  DynamicRequest,
  DynamicRequestStatus,
  InputType,
  RequestService,
  TypeRequest,
} from '@contler/dynamic-services';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReqRecpetionGuest } from '@contler/models';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { EmployerService } from '@contler/hotel/employer/services/employer.service';

@Component({
  selector: 'contler-modal-reception',
  templateUrl: './modal-reception.component.html',
  styleUrls: ['./modal-reception.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalReceptionComponent implements OnInit {
  receptionStatus = [];
  requestStatusForm: FormControl;
  InputType = InputType;
  localZone = localStorage.lan || 'es-CO';
  employers: Observable<EmployerEntity[]>;
  load = false;
  private employer: EmployerEntity;

  constructor(
    public dialogRef: MatDialogRef<ModalReceptionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { requestStatic: ReqRecpetionGuest; requestDynamic: AbstractRequest },
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private requestService: RequestService,
    private employerService: EmployerService,
  ) {
    this.employers = this.employerService.getEmployers();
  }

  get guestName() {
    if (this.data.requestStatic) {
      return `${this.data.requestStatic.guest.name} ${this.data.requestStatic.guest.lastName}`;
    } else {
      return `${this.data.requestDynamic.guest.name} ${this.data.requestDynamic.guest.lastName}`;
    }
  }

  get isRequest() {
    if (this.data.requestStatic) {
      return this.data.requestStatic.request;
    } else {
      if (this.data.requestDynamic.typeRequest === TypeRequest.FORM_REQUEST) {
        return (this.data.requestDynamic as DynamicRequest).form;
      }
    }
  }

  get isActive() {
    if (this.data.requestStatic) {
      return this.data.requestStatic.request.active;
    } else {
      return this.data.requestDynamic.active;
    }
  }

  get rooName() {
    if (this.data.requestStatic) {
      return this.data.requestStatic.guest.room.name;
    } else {
      return this.data.requestDynamic.guest.room.name;
    }
  }

  get createAt() {
    if (this.data.requestStatic) {
      return this.data.requestStatic.request.createAt;
    } else {
      return new Date(this.data.requestDynamic.createAt);
    }
  }

  get nameService() {
    return this.requestService.getNameService(this.data?.requestDynamic);
  }

  get form() {
    if (this.data.requestDynamic.typeRequest === TypeRequest.FORM_REQUEST) {
      return (this.data.requestDynamic as DynamicRequest).form;
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe(({ lang }) => (this.localZone = lang));
    this.requestStatusForm = new FormControl();
    if (this.data.requestStatic) {
      this.receptionStatus = RECEPTION_STATUS;
      this.requestStatusForm.setValue(this.data.requestStatic.request.status);
    } else {
      for (const dynamicRequestStatusKey in DynamicRequestStatus) {
        if (dynamicRequestStatusKey !== 'ALL') {
          this.receptionStatus = [...this.receptionStatus, DynamicRequestStatus[dynamicRequestStatusKey]];
        }
      }
      this.requestStatusForm.setValue(this.data.requestDynamic.status);
    }
    this.cdr.detectChanges();
  }

  update() {
    this.load = true;
    this.requestService
      .changeStatus(this.data.requestDynamic.key, this.requestStatusForm.value, this.employer)
      .then(() => {
        this.load = false;
        this.dialogRef.close();
      });
  }

  changeEmployer(data: EmployerEntity) {
    this.employer = data;
  }
}
