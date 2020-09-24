import { Component, OnInit } from '@angular/core';
import { fullRangeDates } from 'guest/utils/generateTime';
import { DESTINATION_OPTIONS } from '../../const/transportation.const';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contler-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss'],
})
export class TransportationComponent implements OnInit {
  readonly hoursOptions = fullRangeDates();
  readonly destinationOptions = DESTINATION_OPTIONS;

  transportForm: FormGroup;

  constructor(formBuild: FormBuilder) {
    this.transportForm = formBuild.group({
      date: ['', Validators.required],
      departure: ['', Validators.required],
      destination: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  changeDestination(destination: string) {
    const last = this.destinationOptions.length - 1;
    if (destination === this.destinationOptions[last]) {
      this.transportForm.addControl('place', new FormControl('', Validators.required));
    } else if (this.placeControl) {
      this.transportForm.removeControl('place');
    }
  }

  get placeControl() {
    return this.transportForm.get('place');
  }

  saveTransport() {
    const { date, departure, destination, place } = this.transportForm.value;
  }
}
