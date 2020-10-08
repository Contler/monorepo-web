import { Component } from '@angular/core';
import { REQUEST_STATUS } from 'hotel/inmediate-requests/const/request.const';

@Component({
  selector: 'contler-inmediate-requests',
  templateUrl: './inmediate-requests.component.html',
  styleUrls: ['./inmediate-requests.component.scss'],
})
export class InmediateRequestsComponent {
  filterByStatusSelected: string = REQUEST_STATUS.ACTIVE;
  textFilter: string;
  requestStatus = REQUEST_STATUS;

  constructor() {}
}
