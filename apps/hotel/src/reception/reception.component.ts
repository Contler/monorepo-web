import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ReceptionService, UserService } from '@contler/core';
import { AuthService } from 'hotel/services/auth.service';
import { debounceTime, distinctUntilChanged, first, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { forkJoin, from, merge, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ReqRecpetionGuest } from 'hotel/inmediate-requests/components/reception-request/reception-request.component';
import { ImmediateOptionLink, ReceptionModel, ReceptionStatus } from '@contler/models';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { REQUEST_STATUS } from 'hotel/inmediate-requests/const/request.const';
import { FormControl } from '@angular/forms';
import { DynamicModuleService, MODULES } from '@contler/dynamic-services';
import { ModalReceptionComponent } from 'hotel/inmediate-requests/components/modal-reception/modal-reception.component';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'hotel/services/messages/messages.service';

@Component({
  selector: 'contler-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceptionComponent implements OnInit {
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

  public remove(element): void {}

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
            dynamicRequests: this.receptionService.getReceptionRequestDynamic(hotel.uid).pipe(first()),
            categories: this.dynamicModuleService
              .getOptionsModule(hotel.uid, MODULES.reception)
              .pipe(first()),
          });
        }),
      )
      .subscribe(({ staticRequests, dynamicRequests, categories }) => {
        this.categories = categories as ImmediateOptionLink[];
        const dynamicRequestToReceptionModel: ReqRecpetionGuest[] = dynamicRequests.map((dr) => {
          const request: ReceptionModel = {
            uid: dr.key,
            active: dr.active,
            createAt: new Date(dr.createAt),
            room: dr.guest.room,
            hotel: dr.guest.hotel.uid,
            type: dr.nameService,
            status: (dr.status as unknown) as ReceptionStatus,
            guest: dr.guest.uid,
            request: null,
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
    const filterByStatusForm$ = this.filterByStatusForm.valueChanges.pipe();
    const filterByWordForm$ = this.filterByWordForm.valueChanges.pipe();
    const filterByCategoryForm$ = this.filterByCategoryForm.valueChanges.pipe(
      map((category) => {
        switch (category) {
          case 'reception.cashLoan':
            return 'Cash loan';
          case 'reception.transportation':
            return 'Transport';
          case 'reception.currencyExchange':
            return 'Exchange';
          case 'reception.concierge':
            return 'Concierge';
          default:
            return category;
        }
      }),
    );
    merge(filterByStatusForm$, filterByWordForm$, filterByCategoryForm$)
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((filter) => {
        console.log({ filter });
        this.dataSource.filter = filter;
      });
  }

  private formatterReceptionModel(hotelUid: string): Observable<ReqRecpetionGuest[]> {
    return this.receptionService.getReceptionRequest(hotelUid).pipe(
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
          const nReq = requestStatic.request;
          // this.receptionService.receptionRef
          //   .doc(nReq.uid)
          //   .update({ status: d, active: d !== ReceptionStatus.COMPLETED })
          const msg = this.translate.instant('immediateRequest.updateSusses');
          this.messagesService.showToastMessage(msg);
          this.dataSource.data = [...this.dataSource.data];
        } else {
          requestStatic.request.active = true;
        }
      });
  }
}
