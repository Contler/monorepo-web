import { Component, OnInit } from '@angular/core';
import { fullRangeDates } from 'guest/utils/generateTime';

@Component({
  selector: 'contler-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss'],
})
export class TransportationComponent implements OnInit {
  hoursOptions = fullRangeDates();

  constructor() {}

  ngOnInit(): void {}
}
