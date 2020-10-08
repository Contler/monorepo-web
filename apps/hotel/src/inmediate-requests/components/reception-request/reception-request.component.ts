import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { ReceptionService, RoomService, UserService } from '@contler/core';
import { ReceptionModel } from '@contler/models';
import { map, mergeMap, switchMap, take, toArray } from 'rxjs/operators';
import { from, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GuestEntity } from '@contler/entity';
import { MatPaginator } from '@angular/material/paginator';
import { REQUEST_STATUS, TYPE_REQUEST } from '../../const/request.const';
import { CollectionReference } from '@angular/fire/firestore/interfaces';

interface ReqRecpetionGuest {
  request: ReceptionModel;
  guest: GuestEntity;
}

@Component({
  selector: 'contler-reception-request',
  templateUrl: './reception-request.component.html',
  styleUrls: ['./reception-request.component.scss'],
})
export class ReceptionRequestComponent implements OnInit, OnDestroy, OnChanges {
  @Input() filterByStatusSelected: string;
  @Input() textFilter: string;
  @Input() typeReq: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  dataSource = new MatTableDataSource<ReqRecpetionGuest>([]);
  displayedColumns: string[] = ['userName', 'room', 'zone', 'message', 'created_at', 'status', 'actions'];

  private subscribe: Subscription;

  constructor(
    private receptionService: ReceptionService,
    private afs: AngularFirestore,
    private auth: UserService,
    private roomService: RoomService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeReq']) {
      switch (this.typeReq) {
        case TYPE_REQUEST.CLEAN.id:
          this.loadData(this.roomService.cleanRef);
          break;
        case TYPE_REQUEST.MAINTAIN.id:
          this.loadData(this.roomService.maintainRef);
          break;
        default:
          this.loadData(this.receptionService.receptionRef);
      }
    } else if (changes['filterByStatusSelected']) {
      this.dataSource.filter = this.filterByStatusSelected;
    } else if (changes['textFilter'] && typeof this.textFilter === 'string') {
      this.dataSource.filter = !!this.textFilter
        ? this.textFilter.trim().toLowerCase()
        : this.filterByStatusSelected;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter) => this.getFilterPredicate(data, filter);
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  private loadData(req: CollectionReference) {
    this.subscribe = this.afs
      .collection<ReceptionModel>(req)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((data) => from(data)),
        mergeMap((request) =>
          this.auth.getGuestById(request.guest).pipe(map((guest) => ({ request, guest }))),
        ),
        toArray(),
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  private getFilterPredicate(data: ReqRecpetionGuest, filter: string) {
    if (filter === REQUEST_STATUS.ACTIVE) {
      return data.request.active;
    }
    if (filter === REQUEST_STATUS.ALL) {
      return true;
    }

    const showByStatus = this.filterByStatusSelected === REQUEST_STATUS.ACTIVE ? data.request.active : true;
    return (
      showByStatus &&
      (data.guest.name.toLowerCase().includes(filter) ||
        data.request.type.toLowerCase().includes(filter) ||
        data.request.comment.toLowerCase().includes(filter))
    );
  }
}
