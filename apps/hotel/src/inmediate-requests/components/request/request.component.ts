import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { RequestEntity } from '@contler/entity';

import { Subscription } from 'rxjs';

import { REQUEST_STATUS } from '../../const/request.const';
import { ModalInmediateRequestComponent } from '../../../common-components/modal-inmediate-request/modal-inmediate-request.component';
import { MODULES, RequestMessage, RequestService } from '@contler/dynamic-services';
import { AuthService } from '../../../services/auth.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, OnDestroy, OnChanges {
  @Input() filterByStatusSelected: string;
  @Input() textFilter: string;
  @Input() typeRequest: string;
  @Input() subTypeRequest: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  displayedColumns: string[] = [
    'userName',
    'zone',
    'room',
    'message',
    'created_at',
    'employerName',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<RequestMessage>([]);
  private inmediateRequestsSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog, private auth: AuthService, private requestService: RequestService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterByStatusSelected']) {
      this.dataSource.filter = this.filterByStatusSelected;
    }
    if (changes['textFilter'] && typeof this.textFilter === 'string') {
      this.dataSource.filter = !!this.textFilter
        ? this.textFilter.trim().toLowerCase()
        : this.filterByStatusSelected;
    }
    if (changes['typeRequest']) {
      this.dataSource.filter = this.typeRequest;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter) => this.getFilterPredicate(data, filter);
    this.setDataSource();
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }

  update(request: RequestMessage) {
    this.dialog
      .open(ModalInmediateRequestComponent, {
        data: { ...request },
      })
      .afterClosed()
      .subscribe(() => this.setDataSource());
  }

  private setDataSource() {
    this.inmediateRequestsSubscription = this.auth.$hotel
      .pipe(
        first(),
        switchMap((hotel) =>
          this.requestService
            .requestRef((qr) =>
              qr.where('hotelId', '==', hotel.uid).where('service', '==', MODULES.immediate),
            )
            .valueChanges(),
        ),
      )
      .subscribe((requests) => {
        this.dataSource.data = requests as RequestMessage[];
      });

    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  private getFilterPredicate(data: RequestMessage, filter: string) {
    if (filter === REQUEST_STATUS.ACTIVE) {
      return data.active;
    }
    if (filter === REQUEST_STATUS.ALL) {
      return true;
    }
    if (Number.isInteger(parseInt(filter, 0))) {
      return data.zone.category.id === parseInt(filter, 0);
    }

    const showByStatus = this.filterByStatusSelected === REQUEST_STATUS.ACTIVE ? !data.active : true;
    return (
      showByStatus &&
      (data.guest.name.toLowerCase().includes(filter.toString()) ||
        data.zone.name.toLowerCase().includes(filter.toString()) ||
        data.message.toLowerCase().includes(filter.toString()) ||
        (data.assigned && data.assigned.name && data.assigned.name.toLowerCase().includes(filter.toString())))
    );
  }
}
