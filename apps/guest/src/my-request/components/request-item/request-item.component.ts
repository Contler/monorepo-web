import { Component, Input } from '@angular/core';
import {
  AbstractRequest,
  DynamicRequestStatus,
  NAME_MODULES,
  RequestService,
} from '@contler/dynamic-services';

@Component({
  selector: 'contler-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss'],
})
export class RequestItemComponent {
  @Input() request: AbstractRequest;
  @Input() link: string;

  readonly nameModule = NAME_MODULES;

  constructor(private requestService: RequestService) {}

  get colorStatus() {
    return this.request?.status === DynamicRequestStatus.ATTENDED
      ? 'yellow'
      : this.request?.status === DynamicRequestStatus.COMPLETED
      ? 'green'
      : 'red';
  }

  get nameService() {
    if (this.request) {
      return this.requestService.getNameService(this.request);
    } else {
      return '';
    }
  }
}
