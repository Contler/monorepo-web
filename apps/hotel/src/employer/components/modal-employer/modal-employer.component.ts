import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateEmployer } from 'hotel/employer/models/create-employer';
import { UserService } from '@contler/core';
import { EmployerRequest } from '@contler/models';
import { CHIEF, EMPLOYER } from '@contler/const';
import { map, switchMap, take } from 'rxjs/operators';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { Observable } from 'rxjs';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { EmployerEntity, SpecialZoneHotelEntity, ZoneEntity } from '@contler/entity';
import { AngularFireDatabase } from '@angular/fire/database';
import { TranslateService } from '@ngx-translate/core';

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
    private userService: UserService,
    private employerService: EmployerService,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
    private afDb: AngularFireDatabase,
    private translate: TranslateService,
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
    this.userService
      .getUser()
      .pipe(take(1))
      .subscribe((user) => {
        this.specialZones = user.hotel.specialZones
          .filter((zone) => zone.status)
          .map((zone) => ({ ...zone, status: false }));
      });
  }

  createEmployer() {
    this.loading = true;
    const employerData: CreateEmployer = this.formEmployer.value;
    this.userService
      .getUser()
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
            .get('employer.modal.createSuccess')
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
