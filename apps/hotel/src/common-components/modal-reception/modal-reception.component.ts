import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RECEPTION_STATUS } from '@contler/const';
import { DynamicRequest, DynamicRequestStatus, InputType } from '@contler/dynamic-services';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ReqRecpetionGuest } from '@contler/models';

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

  constructor(
    public dialogRef: MatDialogRef<ModalReceptionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { requestStatic: ReqRecpetionGuest; requestDynamic: DynamicRequest },
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

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
      return this.data.requestDynamic.form;
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
    this.dialogRef.close(this.requestStatusForm.value);
  }
}
