import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-modal-employer',
  templateUrl: './modal-employer.component.html',
  styleUrls: ['./modal-employer.component.scss']
})
export class ModalEmployerComponent implements OnInit {

  loading = false;

  formEmployer: FormGroup;

  constructor(formBuild: FormBuilder) {
    this.formEmployer = formBuild.group({
      name: ['', Validators.required],
      leader: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      pass: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

}
