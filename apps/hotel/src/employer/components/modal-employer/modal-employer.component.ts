import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployerRequest } from '@contler/models';
import { CHIEF, EMPLOYER } from '@contler/const';
import { first, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EmployerEntity, SpecialZoneHotelEntity, ZoneEntity } from '@contler/entity';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';
import { EmployerService } from '../../services/employer.service';
import { CreateEmployer } from '../../models/create-employer';
import { ZoneService } from '../../../zone/services/zone.service';
import { MessagesService } from '../../../services/messages/messages.service';
import { AuthService } from '@contler/hotel/services/auth.service';
import { HotelService } from '@contler/hotel/services/hotel.service';

@Component({
  selector: 'contler-modal-employer',
  templateUrl: './modal-employer.component.html',
  styleUrls: ['./modal-employer.component.scss'],
})
export class ModalEmployerComponent {
  loading = false;

  formEmployer: FormGroup;
  leaderZone: { [key: string]: boolean } = {};
  $zone: Observable<ZoneEntity[]>;
  specialZones: SpecialZoneHotelEntity[] = [];

  constructor(
    private dialogRef: MatDialogRef<ModalEmployerComponent>,
    private employerService: EmployerService,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
    private afDb: AngularFireDatabase,
    private translate: TranslateService,
    private auth: AuthService,
    private hotelService: HotelService,
    formBuild: FormBuilder,
  ) {
    this.formEmployer = formBuild.group({
      name: ['', Validators.required],
      leader: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.$zone = this.zoneService.getZones();
    this.auth.$hotel
      .pipe(
        first(),
        switchMap((hotel) => this.hotelService.getSpecialZone(hotel.uid)),
      )
      .subscribe((specialZone) => {
        this.specialZones = specialZone
          .filter((zone) => zone.status)
          .map((zone) => ({ ...zone, status: false }));
      });
  }

  createEmployer() {
    this.loading = true;
    const employerData: CreateEmployer = this.formEmployer.value;
    this.auth.$employer
      .pipe(
        take(1),
        map<EmployerEntity, EmployerRequest>((user) => ({
          name: employerData.name,
          lastName: employerData.lastName,
          idHotel: user.hotel.uid,
          rol: employerData.leader ? CHIEF : EMPLOYER,
          password: employerData.pass,
          email: employerData.email,
          leaderZone: this.leaderZone,
          specialZone: this.specialZones.filter((sp) => sp.status),
        })),
        switchMap((employerRequest) => this.employerService.saveEmployer(employerRequest)),
      )
      .subscribe(
        (employer) => {
          this.loading = false;
          this.dialogRef.close(employer);
          this.translate
            .get('employer.modal.createSusses')
            .subscribe((value) => this.messagesService.showToastMessage(value));
        },
        () => {
          this.loading = false;
          this.messagesService.showServerError();
        },
      );
  }

  close() {
    this.dialogRef.close();
  }
}
