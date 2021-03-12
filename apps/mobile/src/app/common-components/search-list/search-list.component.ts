import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DynamicRequestStatus } from '@contler/dynamic-services';

@Component({
  selector: 'contler-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  @Output() status = new EventEmitter<DynamicRequestStatus>();

  listStatus = [DynamicRequestStatus.ALL, DynamicRequestStatus.PROGRAMING, DynamicRequestStatus.ATTENDED];
  filter = DynamicRequestStatus.ALL;

  constructor() {}

  ngOnInit(): void {
    this.status.emit(DynamicRequestStatus.ALL);
  }
}
