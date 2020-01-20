import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CHIEF, EMPLOYER } from '@contler/const';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { Observable } from 'rxjs';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { EmployerEntity, ZoneEntity } from '@contler/entity';
import { map, switchMap } from 'rxjs/operators';

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

  constructor(
    public dialogRef: MatDialogRef<ModalEditEmployerComponent>,
    formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private employer: EmployerEntity,
    private employerService: EmployerService,
    private zoneService: ZoneService,
    private messagesService: MessagesService,
  ) {
    console.log(employer);
    console.log(employer.avgTime);
    this.formEmployer = formBuild.group({
      name: [employer.name, Validators.required],
      leader: [employer.role === CHIEF, Validators.required],
      lastName: [employer.lastName, Validators.required],
      score: [employer.averageScore, Validators.required],
      averageTime: [employer.avgTime, Validators.required],
      numRequest: [employer.totalServices, Validators.required],
    });
    this.$zone = this.zoneService.getZones();
    employer.leaderZones.forEach(zone => (this.leaderZone[zone.uid] = true));
  }

  saveUser() {
    this.loading = true;
    const { value } = this.formEmployer;
    this.employer.name = value.name;
    this.employer.role = value.leader ? CHIEF : EMPLOYER;
    this.employer.lastName = value.lastName;
    this.$zone
      .pipe(
        map(zones => {
          let newZones: ZoneEntity[] = [];
          Object.keys(this.leaderZone).forEach(id => {
            const zone = zones.find(z => z.uid === id);
            if (zone) {
              newZones = [...newZones, zone];
            }
          });
          return newZones;
        }),
        switchMap(zones => {
          this.employer.leaderZones = zones;
          return this.employerService.updateEmployer(this.employer);
        }),
      )
      .subscribe(
        () => {
          this.loading = false;
          this.dialogRef.close();
          this.messagesService.showToastMessage('Empleado actualizado exitosamente');
        },
        () => {
          this.loading = false;
          this.messagesService.showServerError();
        },
      );
  }

  ngOnInit() {}
}