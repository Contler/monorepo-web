import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AbstractRequest, NAME_MODULES, RequestService, TypeRequest } from '@contler/dynamic-services';
import { GuestService } from '../services/guest.service';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestService as OldRequestService } from 'guest/services/request.service';
import { RequestEntity } from '@contler/entity';
import { MY_REQUEST_CONSTANTS } from './my-request.constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilterListComponent } from 'guest/common-components/filter-list/filter-list.component';
import { Store } from '@ngrx/store';
import { State } from 'guest/app/reducers';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';

@Component({
  selector: 'contler-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss'],
})
export class MyRequestComponent implements OnInit {
  request: Observable<AbstractRequest[]>;
  requestComplete: Observable<AbstractRequest[]>;

  pendingRequests: RequestEntity[];
  readonly constants = MY_REQUEST_CONSTANTS;
  readonly typeRequest = TypeRequest;
  nameModule = [...Object.values(this.constants.options), ...Object.values(NAME_MODULES)].map((val) => ({
    select: false,
    value: val,
    name: val,
  }));
  isComplete = false;
  completeReq: RequestEntity[];

  constructor(
    private db: AngularFirestore,
    private guestService: GuestService,
    private requestService: OldRequestService,
    private bottomSheet: MatBottomSheet,
    private store: Store<State>,
    private reqService: RequestService,
  ) {
    this.nameModule.find((f) => f.value === this.constants.options.all).select = true;
  }

  ngOnInit(): void {
    const guest$ = this.store.pipe(selectUserState).pipe(
      first(),
      map((data) => data.user),
    );

    this.request = guest$.pipe(
      switchMap((guest) =>
        this.reqService
          .requestRef((qr) => qr.where('guestId', '==', guest.uid).orderBy('createAt', 'desc'))
          .valueChanges(),
      ),
    );

    this.requestService.getRequests(false).subscribe((req) => {
      this.pendingRequests = req;
    });
    this.requestService.getRequests(true).subscribe((req) => {
      this.completeReq = req;
    });

    this.requestComplete = guest$.pipe(
      switchMap((guest) =>
        this.reqService
          .requestRef((qr) =>
            qr.where('guestId', '==', guest.uid).where('active', '==', false).orderBy('createAt', 'desc'),
          )
          .valueChanges(),
      ),
    );
  }

  openFilter() {
    this.bottomSheet
      .open(FilterListComponent, {
        data: {
          title: this.constants.filter,
          list: this.nameModule,
        },
        panelClass: 'bottom-custom',
      })
      .afterDismissed()
      .pipe(filter((f) => !!f))
      .subscribe((data) => {
        this.nameModule = [...data];
      });
  }

  get showImmediate() {
    return (
      this.nameModule.find((f) => f.value === this.constants.options.all).select ||
      this.nameModule.find((f) => f.value === this.constants.options.immediate).select
    );
  }
}
