import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ImmediateOptionLink, ReceptionModel, ReceptionStatus, ReqRecpetionGuest } from '@contler/models';
import { FormControl } from '@angular/forms';
import { ReceptionService, UserService } from '@contler/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicModuleService, DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { MatDialog } from '@angular/material/dialog';
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  mergeMap,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { combineLatest, forkJoin, from, merge, Observable } from 'rxjs';
import { ModalReceptionComponent } from '../common-components/modal-reception/modal-reception.component';
import { REQUEST_STATUS } from '../inmediate-requests/const/request.const';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../services/messages/messages.service';

@Component({
  selector: 'contler-cleaning',
  templateUrl: './cleaning.component.html',
  styleUrls: ['./cleaning.component.scss'],
})
export class CleaningComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public requestStatus = {
    ACTIVE: 'actives',
    ALL: 'all',
  };
  localZone = localStorage.lan || 'es-CO';
  dataSource: MatTableDataSource<ReqRecpetionGuest> = new MatTableDataSource<ReqRecpetionGuest>([]);
  displayedColumns: string[] = [
    'userName',
    'room',
    'zone',
    'createdAtDate',
    'created_at',
    'status',
    'actions',
  ];
  public filterByStatusForm: FormControl;
  public filterByWordForm: FormControl;
  public filterByCategoryForm: FormControl;
  public categories: ImmediateOptionLink[];

  constructor(
    private receptionService: ReceptionService,
    private authService: AuthService,
    private userService: UserService,
    private translate: TranslateService,
    private dynamicModuleService: DynamicModuleService,
    private matDialog: MatDialog,
    private messagesService: MessagesService,
  ) {}

  get filterByStatusSelected() {
    return this.filterByStatusForm.value;
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.setupFormListeners();
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

  openModal(request: ReqRecpetionGuest) {
    const receptionDynamic = this.receptionService.receptionRequest.find(
      (r) => r.key === request.request.uid,
    );
    const requestStatic = receptionDynamic ? null : request;
    this.matDialog
      .open(ModalReceptionComponent, {
        data: { requestStatic: requestStatic, requestDynamic: receptionDynamic },
      })
      .afterClosed()
      .pipe()
      .subscribe((d) => {
        if (d) {
          if (requestStatic) {
            const nReq = requestStatic.request;
            request.request.status = d;
            request.request.active = d !== ReceptionStatus.COMPLETED;
            this.receptionService.receptionRef
              .doc(nReq.uid)
              .update({ status: d, active: d !== ReceptionStatus.COMPLETED });
          } else {
            receptionDynamic.status = d;
            receptionDynamic.active = d !== DynamicRequestStatus.COMPLETED;
            request.request.active = receptionDynamic.active;
            request.request.status = d;
            this.dynamicModuleService.updateDynamicRequest(receptionDynamic);
          }
          const msg = this.translate.instant('immediateRequest.updateSusses');
          this.messagesService.showToastMessage(msg);
          this.dataSource.data = [...this.dataSource.data];
        }
      });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private getFilterPredicate(data: ReqRecpetionGuest, filter2: string) {
    if (!filter2) {
      return true;
    }
    if (filter2 === REQUEST_STATUS.ACTIVE) {
      return data.request.active;
    }
    if (filter2 === REQUEST_STATUS.ALL) {
      return true;
    }
    const showByCategory = filter2 === data.request.type;
    const showByStatus = this.filterByStatusSelected === REQUEST_STATUS.ACTIVE ? data.request.active : true;
    return (
      (showByStatus &&
        (data.guest.name.toLowerCase().includes(filter2) ||
          data.request.type.toLowerCase().includes(filter2))) ||
      showByCategory
    );
  }

  private loadInitialData(): void {
    this.translate.onLangChange.subscribe(({ lang }) => (this.localZone = lang));
    this.filterByStatusForm = new FormControl(this.requestStatus.ALL);
    this.filterByWordForm = new FormControl('');
    this.filterByCategoryForm = new FormControl(this.requestStatus.ALL);
    this.authService.$hotel
      .pipe(
        first(),
        switchMap((hotel) => {
          return forkJoin({
            staticRequests: this.formatterReceptionModel(hotel.uid).pipe(first()),
            dynamicRequests: combineLatest([
              this.dynamicModuleService
                .getDynamicRequest(hotel.uid, MODULES.cleaning, true, 30)
                .pipe(first()),
              this.dynamicModuleService
                .getDynamicRequest(hotel.uid, MODULES.cleaning, false, 30)
                .pipe(first()),
            ]).pipe(
              map(([active, inactive]) => [...active, ...inactive]),
              tap((requests) => (this.receptionService.receptionRequest = requests)),
            ),
            categories: this.dynamicModuleService.getOptionsModule(hotel.uid, MODULES.cleaning).pipe(first()),
          });
        }),
      )
      .subscribe(({ staticRequests, dynamicRequests, categories }) => {
        this.categories = categories as ImmediateOptionLink[];
        const dynamicRequestToReceptionModel: ReqRecpetionGuest[] = dynamicRequests.map((dr) => {
          const request: ReceptionModel = {
            uid: dr.key,
            active: dr.active,
            createAt: dr.createAt,
            room: dr.guest.room,
            hotel: dr.guest.hotel.uid,
            type: dr.nameService,
            status: (dr.status as unknown) as ReceptionStatus,
            guest: dr.guest.uid,
            comment: null,
          };
          return {
            request,
            guest: dr.guest,
          };
        });
        this.dataSource.data = [...staticRequests, ...dynamicRequestToReceptionModel];
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter2) => this.getFilterPredicate(data, filter2);
      });
  }

  private setupFormListeners(): void {
    const filterByStatusForm$ = this.filterByStatusForm.valueChanges;
    const filterByWordForm$ = this.filterByWordForm.valueChanges;
    const filterByCategoryForm$ = this.filterByCategoryForm.valueChanges;
    merge(filterByStatusForm$, filterByWordForm$, filterByCategoryForm$)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((filter) => {
        this.dataSource.filter = filter;
      });
  }

  private formatterReceptionModel(hotelUid: string): Observable<ReqRecpetionGuest[]> {
    return this.receptionService.getMaintenanceRequest(hotelUid).pipe(
      first(),
      switchMap((requests) => from(requests)),
      mergeMap<ReceptionModel, Observable<ReqRecpetionGuest>>((request) =>
        this.userService.getGuestById(request.guest).pipe(map((guest) => ({ request, guest }))),
      ),
      toArray(),
      map((data) =>
        data.sort((a, b) => this.compare(a.request.createAt.getTime(), b.request.createAt.getTime(), true)),
      ),
    );
  }
}
