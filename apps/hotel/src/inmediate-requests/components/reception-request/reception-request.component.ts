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
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalReceptionComponent } from '../modal-reception/modal-reception.component';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';

export interface ReqRecpetionGuest {
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
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  localZone = localStorage.lan || 'es-CO';
  dataSource = new MatTableDataSource<ReqRecpetionGuest>([]);
  displayedColumns: string[] = [
    'userName',
    'room',
    'zone',
    'message',
    'createdAtDate',
    'created_at',
    'status',
    'actions',
  ];

  private subscribe: Subscription;

  constructor(
    private receptionService: ReceptionService,
    private afs: AngularFirestore,
    private auth: UserService,
    private roomService: RoomService,
    private dialog: MatDialog,
    private messageService: MessagesService,
    private translate: TranslateService,
  ) {
    translate.onLangChange.subscribe(({ lang }) => (this.localZone = lang));
  }

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
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter2) => this.getFilterPredicate(data, filter2);
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

  openModal(request: ReqRecpetionGuest) {
    this.dialog
      .open(ModalReceptionComponent, { data: request })
      .afterClosed()
      .pipe()
      .subscribe((d) => {
        if (d) {
          const nReq = request.request;
          switch (this.typeReq) {
            case TYPE_REQUEST.CLEAN.id:
              this.roomService.cleanRef.doc(nReq.uid).update({ active: nReq.active });
              break;
            case TYPE_REQUEST.MAINTAIN.id:
              this.roomService.maintainRef.doc(nReq.uid).update({ active: nReq.active });
              break;
            default:
              this.receptionService.receptionRef.doc(nReq.uid).update({ active: nReq.active });
          }
          const msg = this.translate.instant('immediateRequest.updateSuccess');
          this.messageService.showToastMessage(msg);
          this.dataSource.data = [...this.dataSource.data];
        } else {
          request.request.active = true;
        }
      });
  }

  private loadData(req: CollectionReference) {
    this.subscribe = this.auth
      .getUser()
      .pipe(
        take(1),
        switchMap((usr) =>
          this.afs
            .collection<ReceptionModel>(req, (ref) =>
              ref.where('hotel', '==', usr.hotel.uid).orderBy('createAt', 'desc'),
            )
            .valueChanges(),
        ),
        take(1),
        switchMap((data) => from(data)),
        mergeMap((request) =>
          this.auth.getGuestById(request.guest).pipe(map((guest) => ({ request, guest }))),
        ),
        toArray(),
        map((data) =>
          data.sort((a, b) =>
            this.compare(a.request.createAt.getTime(), b.request.createAt.getTime(), false),
          ),
        ),
      )
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  private getFilterPredicate(data: ReqRecpetionGuest, filter2: string) {
    if (filter2 === REQUEST_STATUS.ACTIVE) {
      return data.request.active;
    }
    if (filter2 === REQUEST_STATUS.ALL) {
      return true;
    }

    const showByStatus = this.filterByStatusSelected === REQUEST_STATUS.ACTIVE ? data.request.active : true;
    return (
      showByStatus &&
      (data.guest.name.toLowerCase().includes(filter2) ||
        data.request.type.toLowerCase().includes(filter2) ||
        data.request.comment.toLowerCase().includes(filter2))
    );
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      return;
    }
    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'createdAtDate':
          return this.compare(a.request.createAt.getTime(), b.request.createAt.getTime(), isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
