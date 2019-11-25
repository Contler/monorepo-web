import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employer } from '@contler/core/models';
import { CHIEF, EMPLOYER } from '@contler/core/const';
import { EmployerService } from 'hotel/employer/services/employer.service';

@Component({
  selector: 'contler-modal-edit-employer',
  templateUrl: './modal-edit-employer.component.html',
  styleUrls: ['./modal-edit-employer.component.scss'],
})
export class ModalEditEmployerComponent implements OnInit {
  loading = false;

  formEmployer: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEditEmployerComponent>,
    formBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private employer: Employer,
    private employerService: EmployerService,
  ) {
    this.formEmployer = formBuild.group({
      name: [employer.name, Validators.required],
      leader: [employer.role === CHIEF, Validators.required],
      lastName: [employer.lastName, Validators.required],
      score: [employer.score, Validators.required],
      averageTime: [employer.timeAverage, Validators.required],
      numRequest: [employer.servicesNum, Validators.required],
    });
  }

  saveUser() {
    this.loading = true;
    const { value } = this.formEmployer;
    this.employer.name = value.name;
    this.employer.role = value.leader ? CHIEF : EMPLOYER;
    this.employer.lastName = value.lastName;
    this.employerService.updateEmployer(this.employer).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

  ngOnInit() {}
}
