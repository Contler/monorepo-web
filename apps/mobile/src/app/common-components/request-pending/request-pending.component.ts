import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus, MODULES, RequestService } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectByModule } from '../../reducers/request/request.selectors';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-request-pending',
  templateUrl: './request-pending.component.html',
  styleUrls: ['./request-pending.component.scss'],
})
export class RequestPendingComponent implements OnInit, OnChanges {
  @Input() module: MODULES;
  @Input() filter: DynamicRequestStatus = DynamicRequestStatus.ALL;
  totalRequest: number;
  dynamicReq: Observable<DynamicRequest[]>;

  constructor(private requestService: RequestService, private store: Store<State>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['module']) {
      this.dynamicReq = this.store.select(selectByModule(this.module)).pipe(
        map((data) => data as DynamicRequest[]),
        tap((data) => (this.totalRequest = data.length)),
      );
    }
  }
}
