import { Component, OnInit } from '@angular/core';
import { REQUEST_STATUS, TYPE_REQUEST } from 'hotel/inmediate-requests/const/request.const';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contler-inmediate-requests',
  templateUrl: './inmediate-requests.component.html',
  styleUrls: ['./inmediate-requests.component.scss'],
})
export class InmediateRequestsComponent implements OnInit {
  queryParams = this.activeRoute.snapshot.queryParams;
  filterByStatusSelected: string = REQUEST_STATUS.ACTIVE;
  textFilter: string;
  activeRequest = 0;
  requestStatus = REQUEST_STATUS;
  typeRequests = TYPE_REQUEST;

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.queryParams['RECEPTION']) {
      this.activeRequest = this.typeRequests.RECEPTION.id;
    }
  }
}
