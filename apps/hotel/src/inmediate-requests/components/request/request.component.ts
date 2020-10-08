import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { RequestEntity } from '@contler/entity';

import { Subscription } from 'rxjs';

import { REQUEST_STATUS } from '../../const/request.const';
import { InmediateRequestsService } from '../../services/inmediate-requests.service';
import { ModalInmediateRequestComponent } from '../../../common-components/modal-inmediate-request/modal-inmediate-request.component';

@Component({
  selector: 'contler-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit, OnDestroy, OnChanges {
  @Input() filterByStatusSelected: string;
  @Input() textFilter: string;
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
  dataSource = new MatTableDataSource<RequestEntity>([]);
  private inmediateRequestsSubscription: Subscription | null = null;

  constructor(private inmediateRequestsService: InmediateRequestsService, private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterByStatusSelected']) {
      this.dataSource.filter = this.filterByStatusSelected;
    }
    if (changes['textFilter'] && typeof this.textFilter === 'string') {
      this.dataSource.filter = !!this.textFilter
        ? this.textFilter.trim().toLowerCase()
        : this.filterByStatusSelected;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter) => this.getFilterPredicate(data, filter);

    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .subscribe((requests) => {
        this.dataSource.data = requests;
      });

    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }

  update(request: RequestEntity) {
    this.dialog.open(ModalInmediateRequestComponent, {
      data: { ...request },
    });
  }

  private getFilterPredicate(data: RequestEntity, filter: string) {
    if (filter === REQUEST_STATUS.ACTIVE) {
      return !data.complete;
    }
    if (filter === REQUEST_STATUS.ALL) {
      return true;
    }

    const showByStatus = this.filterByStatusSelected === REQUEST_STATUS.ACTIVE ? !data.complete : true;
    return (
      showByStatus &&
      (data.guest.name.toLowerCase().includes(filter) ||
        data.zone.name.toLowerCase().includes(filter) ||
        data.message.toLowerCase().includes(filter) ||
        (data.solved && data.solved.name && data.solved.name.toLowerCase().includes(filter)))
    );
  }
}
