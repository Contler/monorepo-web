import { Component, Input, OnInit } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus, NAME_MODULES } from '@contler/dynamic-services';

@Component({
  selector: 'contler-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss'],
})
export class RequestItemComponent implements OnInit {
  @Input() request: DynamicRequest;
  readonly nameModule = NAME_MODULES;

  constructor() {}

  ngOnInit(): void {}

  get colorStatus() {
    return this.request?.status === DynamicRequestStatus.ATTENDED
      ? 'yellow'
      : this.request?.status === DynamicRequestStatus.COMPLETED
      ? 'green'
      : 'red';
  }
}
