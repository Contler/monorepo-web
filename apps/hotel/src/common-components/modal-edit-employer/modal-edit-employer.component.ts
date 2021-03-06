import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CHIEF, EMPLOYER } from '@contler/const';
import { Observable } from 'rxjs';
import { EmployerEntity, SpecialZoneHotelEntity, ZoneEntity } from '@contler/entity';
import { first, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { EmployerService } from '../../employer/services/employer.service';
import { ZoneService } from '../../zone/services/zone.service';
import { MessagesService } from '../../services/messages/messages.service';
import { HotelService } from '@contler/hotel/services/hotel.service';
import { AuthService } from '@contler/hotel/services/auth.service';

@Component({
  selector: 'contler-modal-edit-employer',
  templateUrl: './modal-edit-employer.component.html',
  styleUrls: ['./modal-edit-employer.component.scss'],
})
export class ModalEditEmployerComponent implements OnInit {
  loading = false;

  formEmployer: FormGroup;
  leaderZone: { [key: string]: boolean } = {};
  $zone: Observable<ZoneEntity[]>;

  specialZones: SpecialZoneHotelEntity[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalEditEmployerComponent>,
    formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public employer: EmployerEntity,
    private employerService: EmployerService,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
    private translate: TranslateService,
    private hotelService: HotelService,
    private auth: AuthService,
  ) {
    this.auth.$hotel
      .pipe(
        first(),
        switchMap((hotel) => this.hotelService.getSpecialZone(hotel.uid)),
      )
      .subscribe((zone) => {
        this.specialZones = zone.filter((sp) => sp.status).map((sp) => ({ ...sp, status: false }));
        employer.leaderSpecialZone.forEach((sp) => {
          const temp = this.specialZones.find((sp2) => sp2.id === sp.id);
          if (temp) {
            temp.status = true;
          }
        });
      });
    this.formEmployer = formBuild.group({
      name: [employer.name, Validators.required],
      leader: [employer.role === CHIEF, Validators.required],
      lastName: [employer.lastName, Validators.required],
      email: [employer.email],
      score: [employer.averageScore],
      averageTime: [employer.avgTime],
      numRequest: [employer.totalServices],
    });
    this.$zone = this.zoneService.getZones();
    employer.leaderZones.forEach((zone) => (this.leaderZone[zone.uid] = true));
  }

  saveUser() {
    this.loading = true;
    const { value } = this.formEmployer;
    this.employer.name = value.name;
    this.employer.role = value.leader ? CHIEF : EMPLOYER;
    this.employer.lastName = value.lastName;
    this.employer.leaderSpecialZone = this.specialZones.filter((sp) => sp.status);
    this.$zone
      .pipe(
        map((zones) => {
          let newZones: ZoneEntity[] = [];
          Object.keys(this.leaderZone).forEach((id) => {
            const zone = zones.find((z) => z.uid === id);
            if (zone) {
              newZones = [...newZones, zone];
            }
          });
          return newZones;
        }),
        switchMap((zones) => {
          this.employer.leaderZones = zones;
          return this.employerService.updateEmployer(this.employer);
        }),
      )
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close();
          this.translate
            .get('employer.modal.updateSusses')
            .subscribe((msg) => this.messagesService.showToastMessage(msg));
        },
        () => {
          this.loading = false;
          this.messagesService.showServerError();
        },
      );
  }

  ngOnInit() {}
}
