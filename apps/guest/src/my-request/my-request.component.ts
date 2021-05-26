import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DynamicRequest, NAME_MODULES, receptionDynamicConverter } from '@contler/dynamic-services';
import { GuestService } from '../services/guest.service';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestService } from 'guest/services/request.service';
import { RequestEntity } from '@contler/entity';
import { MY_REQUEST_CONSTANTS } from './my-request.constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilterListComponent } from 'guest/common-components/filter-list/filter-list.component';

@Component({
  selector: 'contler-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss'],
})
export class MyRequestComponent implements OnInit {
  request: Observable<DynamicRequest[]>;
  pendingRequests: RequestEntity[];
  readonly constants = MY_REQUEST_CONSTANTS;
  nameModule = [...Object.values(this.constants.options), ...Object.values(NAME_MODULES)].map((val) => ({
    select: false,
    value: val,
  }));
  isComplete = false;
  completeReq: RequestEntity[];
  requestComplete: Observable<DynamicRequest[]>;

  constructor(
    private db: AngularFirestore,
    private guestService: GuestService,
    private requestService: RequestService,
    private bottomSheet: MatBottomSheet,
  ) {
    this.nameModule.find(f => f.value === this.constants.options.all).select = true;
  }

  ngOnInit(): void {
    const reference = this.db.firestore.collection('dynamicRequest').withConverter(receptionDynamicConverter);
    this.request = this.guestService.$guest.pipe(
      switchMap((user) =>
        this.db
          .collection<DynamicRequest>(reference, (ref) =>
            ref.where('guestId', '==', user.uid).where('active', '==', true),
          )
          .valueChanges(),
      ),
    );
    this.requestService.getRequests(false).subscribe((req) => {
      this.pendingRequests = req;
    });
    this.requestService.getRequests(true).subscribe((req) => {
      this.completeReq = req;
    });
    this.requestComplete = this.guestService.$guest.pipe(
      switchMap((user) =>
        this.db
          .collection<DynamicRequest>(reference, (ref) =>
            ref.where('guestId', '==', user.uid).where('active', '==', false),
          )
          .valueChanges(),
      ),
    );
  }

  openFilter() {
    this.bottomSheet.open(FilterListComponent, {
      data: {
        title: this.constants.filter,
        list: this.nameModule,
      },
      panelClass: 'bottom-custom',
    }).afterDismissed().pipe(filter(f => !!f)).subscribe(data => {
      this.nameModule = [...data]
    })
  }

  get showImmediate() {
    return (
      this.nameModule.find((f) => f.value === this.constants.options.all).select ||
      this.nameModule.find((f) => f.value === this.constants.options.immediate).select
    );
  }
}
