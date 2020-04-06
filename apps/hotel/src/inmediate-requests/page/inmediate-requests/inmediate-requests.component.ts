import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RequestEntity } from '@contler/entity';
import { ModalInmediateRequestComponent } from 'hotel/common-components/modal-inmediate-request/modal-inmediate-request.component';

@Component({
  selector: 'contler-inmediate-requests',
  templateUrl: './inmediate-requests.component.html',
  styleUrls: ['./inmediate-requests.component.scss'],
})
export class InmediateRequestsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['userName', 'zone', 'room', 'message', 'created_at', 'employerName', 'status', 'actions'];
  dataSource = new MatTableDataSource<RequestEntity>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  private inmediateRequestsSubscription: Subscription | null = null;
  public requestStatus = {
    ACTIVE: 'actives',
    ALL: 'all',
  };
  public filterByStatusSelected: string = this.requestStatus.ACTIVE;

  constructor(private inmediateRequestsService: InmediateRequestsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter === this.requestStatus.ACTIVE) {
        return data.finishAt ? false : true;
      }
      if (filter === this.requestStatus.ALL) {
        return true;
      }
      const response =
        data.guest.name.toLowerCase().includes(filter) ||
        data.zone.name.toLowerCase().includes(filter) ||
        data.message.toLowerCase().includes(filter) ||
        (data.solved && data.solved.name && data.solved.name.toLowerCase().includes(filter));
      return response ? true : false;
    };
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .subscribe(requests => {
        this.dataSource.data = requests;
      });
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  ngOnDestroy() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  update(request: RequestEntity) {
    this.dialog.open(ModalInmediateRequestComponent, {
      data: {...request},
    });
  }

  filterByStatus() {
    this.dataSource.filter = this.filterByStatusSelected;
  }
}
