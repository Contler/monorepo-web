import { Component, Input } from '@angular/core';
import {
  AbstractRequest,
  DynamicRequest,
  DynamicRequestStatus,
  NAME_MODULES,
  RequestMessage,
  TypeRequest,
} from '@contler/dynamic-services';

@Component({
  selector: 'contler-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.scss'],
})
export class RequestItemComponent {
  @Input() request: AbstractRequest;
  readonly nameModule = NAME_MODULES;

  constructor() {}

  get colorStatus() {
    return this.request?.status === DynamicRequestStatus.ATTENDED
      ? 'yellow'
      : this.request?.status === DynamicRequestStatus.COMPLETED
      ? 'green'
      : 'red';
  }

  get nameService() {
    if (this.request) {
      switch (this.request.typeRequest) {
        case TypeRequest.FORM_REQUEST:
          return (this.request as DynamicRequest).nameService;
        case TypeRequest.MESSAGE_REQUEST:
          return (this.request as RequestMessage).message;
        default:
          return (this.request as DynamicRequest).nameService;
      }
    } else {
      return '';
    }
  }
}
