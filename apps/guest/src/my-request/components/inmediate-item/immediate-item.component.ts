import { Component, Input, OnInit } from '@angular/core';
import { RequestEntity } from '@contler/entity';

@Component({
  selector: 'contler-immediate-item',
  templateUrl: './immediate-item.component.html',
  styleUrls: ['../request-item/request-item.component.scss'],
})
export class ImmediateItemComponent implements OnInit {
  @Input() request: RequestEntity;
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
