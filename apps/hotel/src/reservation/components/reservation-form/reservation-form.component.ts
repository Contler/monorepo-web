import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEntity } from '@contler/entity';
import { ICONS } from '@contler/const';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { ReservationRequest } from '@contler/models';

@Component({
  selector: 'contler-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent {
  @Input() load = false;
  @Output() reservationRequest = new EventEmitter<ReservationRequest>();
  @ViewChild(FormGroupDirective, { static: true }) myForm!: FormGroupDirective;

  categoryZone: Observable<CategoryEntity[]>;
  icons = ICONS;
  zoneForm: FormGroup;

  constructor(private zoneServices: ZoneService, formBuild: FormBuilder) {
    this.categoryZone = this.zoneServices.getCategories();
    this.zoneForm = formBuild.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      icon: [''],
    });
  }

  complete() {
    const reservationRequest = new ReservationRequest();
    reservationRequest.name = this.zoneForm.value.name;
    reservationRequest.category = this.zoneForm.value.category;
    reservationRequest.icon = this.zoneForm.value.icon;
    this.reservationRequest.emit(reservationRequest);
  }

  reset() {
    this.zoneForm.reset();
    this.myForm.resetForm();
  }
}
