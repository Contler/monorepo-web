import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServiceType } from '../../principal/principal.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import * as RequestSelectors from '../../../reducers/request/request.selectors';
import { HotelEntity } from '@contler/entity';

interface Type {
  icon: string;
  name: string;
  route: string;
  type: ServiceType;
}

@Component({
  selector: 'contler-item-home',
  templateUrl: './item-home.component.html',
  styleUrls: ['./item-home.component.scss'],
})
export class ItemHomeComponent implements OnInit, OnChanges {
  @Input() type: Type;
  $count: Observable<number>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    switch (this.type.type) {
      case ServiceType.IMMEDIATE:
        this.$count = this.store.select(RequestSelectors.selectImmediate).pipe(map(({ count }) => count));
        break;
      case ServiceType.SPECIAL:
        this.$count = this.store.select(RequestSelectors.selectSpecial).pipe(map(({ count }) => count));
        break;
      case ServiceType.WAKE_UP:
        this.$count = this.store.select(RequestSelectors.selectWakeUp).pipe(map(({ count }) => count));
        break;
      case ServiceType.RESERVATION:
        this.$count = this.store.select(RequestSelectors.selectBooking).pipe(map(({ count }) => count));
        break;
      case ServiceType.DELIVERY:
        this.$count = this.store.select(RequestSelectors.selectOrders).pipe(map(({ count }) => count));
        break;
      case ServiceType.RECEPTION:
        this.$count = this.store.select(RequestSelectors.selectReception).pipe(map(({ count }) => count));
        break;
      case ServiceType.CHECK_OUT:
        this.$count = this.store.select(RequestSelectors.selectLate).pipe(map(({ count }) => count));
        break;
      case ServiceType.CLEAN:
        this.$count = this.store.select(RequestSelectors.selectClean).pipe(map(({ count }) => count));
        break;
      case ServiceType.ROOM:
        this.$count = this.store.select(RequestSelectors.selectRoom).pipe(map(({ count }) => count));
        break;
      case ServiceType.MAINTAIN:
        this.$count = this.store.select(RequestSelectors.selectMaintain).pipe(map(({ count }) => count));
    }
  }
}
