import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicRequest, DynamicRequestStatus, MODULES, RequestService } from '@contler/dynamic-services';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { selectHotel } from '../../reducers/user/user.selectors';
import { startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-request-complete',
  templateUrl: './request-complete.component.html',
  styleUrls: ['./request-complete.component.scss'],
})
export class RequestCompleteComponent implements OnChanges {
  @Input() module: MODULES;
  @Input() filter: DynamicRequestStatus = DynamicRequestStatus.ALL;
  request: Observable<DynamicRequest[]>;
  count: number;

  constructor(private requestService: RequestService, private store: Store<State>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['module']) {
      this.request = this.store.pipe(
        selectHotel,
        switchMap((hotel) =>
          this.requestService
            .getByService(this.module, {
              hotelId: hotel.uid,
              active: false,
              date: startOfWeek(new Date()),
            })
            .valueChanges(),
        ),
        map((data) => data as DynamicRequest[]),
        tap((data) => (this.count = data.length)),
      );
    }
  }
}
