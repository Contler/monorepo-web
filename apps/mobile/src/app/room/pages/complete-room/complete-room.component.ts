import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { DynamicRequest, MODULES, RequestService } from '@contler/dynamic-services';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer, selectHotel } from '../../../reducers/user/user.selectors';
import { startOfWeek } from 'date-fns';

@Component({
  selector: 'contler-complete-room',
  templateUrl: './complete-room.component.html',
  styleUrls: ['./complete-room.component.scss'],
})
export class CompleteRoomComponent implements OnInit {
  user: EmployerEntity;
  totalReception: number;
  dynamicReq: Observable<DynamicRequest[]>;

  constructor(public menu: MenuController, private store: Store<State>, requestService: RequestService) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
    this.dynamicReq = this.store.pipe(
      selectHotel,
      switchMap((hotel) =>
        requestService
          .getByService(MODULES.room, {
            hotelId: hotel.uid,
            active: false,
            date: startOfWeek(new Date()),
          })
          .valueChanges(),
      ),
      map((data) => data as DynamicRequest[]),
      tap((data) => (this.totalReception = data.length)),
    );
  }

  ngOnInit(): void {}
}
