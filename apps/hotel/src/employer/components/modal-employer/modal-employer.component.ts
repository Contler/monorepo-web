import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateEmployer } from 'hotel/employer/models/create-employer';
import { UserService } from '@contler/core';
import { Admin, Employer, EmployerRequest, MapZone } from '@contler/core/models';
import { CHIEF, EMPLOYER } from '@contler/core/const';
import { map, switchMap, take } from 'rxjs/operators';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { ZoneService } from 'hotel/zone/services/zone.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-modal-employer',
  templateUrl: './modal-employer.component.html',
  styleUrls: ['./modal-employer.component.scss'],
})
export class ModalEmployerComponent {
  loading = false;

  formEmployer: FormGroup;
  $zone: Observable<MapZone>;
  leaderZone: { [key: string]: boolean } = {};

  constructor(
    private dialogRef: MatDialogRef<ModalEmployerComponent>,
    private userService: UserService,
    private employerService: EmployerService,
    private zoneService: ZoneService,
    formBuild: FormBuilder,
  ) {
    this.formEmployer = formBuild.group({
      name: ['', Validators.required],
      leader: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.$zone = this.zoneService.getMapZone(this.zoneService.getZones());
  }

  createEmployer() {
    this.loading = true;
    const employerData: CreateEmployer = this.formEmployer.value;
    this.userService
      .getUser()
      .pipe(
        take(1),
        map<Admin | Employer, EmployerRequest>(user => ({
          name: employerData.name,
          lastName: employerData.lastName,
          idHotel: user.hotel!,
          rol: employerData.leader ? CHIEF : EMPLOYER,
          password: employerData.pass,
          email: employerData.email,
          leaderZone: this.leaderZone
        })),
        switchMap(employerRequest => this.employerService.saveEmployer(employerRequest)),
      )
      .subscribe(employer => {
        this.loading = false;
        this.dialogRef.close(employer);
      });
  }

  close() {
    this.dialogRef.close();
  }
}
