import { Component, Input, OnInit } from '@angular/core';
import { RequestEntity } from '@contler/entity';
import { MY_REQUEST_CONSTANTS } from '../../my-request.constants';

@Component({
  selector: 'contler-immediate-item',
  templateUrl: './immediate-item.component.html',
  styleUrls: ['../request-item/request-item.component.scss'],
})
export class ImmediateItemComponent implements OnInit {
  @Input() request: RequestEntity;
  constants = MY_REQUEST_CONSTANTS;

  constructor() {}

  ngOnInit(): void {}

  get colorStatus() {
    return !this.request?.complete && !this.request?.attended
      ? 'red'
      : !this.request?.complete
      ? 'yellow'
      : 'green';
  }
}
