import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { first, map, tap } from 'rxjs/operators';
import { DynamicRequest, DynamicRequestStatus, RequestService } from '@contler/dynamic-services';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer } from '../../../reducers/user/user.selectors';
import { selectRoom } from '../../../reducers/request/request.selectors';

@Component({
  selector: 'contler-pendig-room',
  templateUrl: './pendig-room.component.html',
  styleUrls: ['./pendig-room.component.scss'],
})
export class PendigRoomComponent implements OnInit {
  user: EmployerEntity;
  totalReception: number;
  listStatus = [DynamicRequestStatus.ALL, DynamicRequestStatus.PROGRAMING, DynamicRequestStatus.ATTENDED];
  filter = DynamicRequestStatus.ALL;
  requests$: Observable<DynamicRequest[]>;

  constructor(public menu: MenuController, requestService: RequestService, private store: Store<State>) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
    this.requests$ = this.store.select(selectRoom).pipe(
      map((data) => data.requests as DynamicRequest[]),
      tap((data) => (this.totalReception = data.length)),
    );
  }

  ngOnInit(): void {}
}
