import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryEntity } from '@contler/entity';
import { ICONS } from '@contler/const';
import { ZoneService } from '@contler/hotel/zone/services/zone.service';
import { ZoneReserveEntity } from '@contler/entity/zone-reserve.entity';
import { ReservationRequest } from '@contler/models';

@Component({
  selector: 'contler-sub-zone-reservation-form',
  templateUrl: './sub-zone-reservation-form.component.html',
  styleUrls: ['./sub-zone-reservation-form.component.scss'],
})
export class SubZoneReservationFormComponent {
  @Input() load = false;
  @Input() subZoneFormValue = false;
  @Input() zoneReservations: ZoneReserveEntity[] = [];
  @Output() reservationRequest = new EventEmitter<ReservationRequest>();
  @Output() hiddenSubZoneForm = new EventEmitter<boolean>();
  @ViewChild(FormGroupDirective, { static: true }) myForm!: FormGroupDirective;
  categoryZone: Observable<CategoryEntity[]>;
  icons = ICONS;
  subZoneForm: FormGroup;

  constructor(private zoneService: ZoneService, formBuild: FormBuilder) {
    this.categoryZone = this.zoneService.getCategories();
    this.subZoneForm = formBuild.group({
      name: ['', Validators.required],
      zoneParent: ['', Validators.required],
      icon: [''],
    });
  }

  complete() {
    const reservationRequest = new ReservationRequest();
    reservationRequest.name = this.subZoneForm.value.name;
    reservationRequest.zoneParent = this.subZoneForm.value.zoneParent;
    reservationRequest.icon = this.subZoneForm.value.icon;
    this.reservationRequest.emit(reservationRequest);
  }

  reset() {
    this.subZoneForm.reset();
    this.myForm.resetForm();
  }
}
