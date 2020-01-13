import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpecialRequest } from '@contler/models';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SpecialRequestsService } from 'hotel/special-requests/services/special-requests.service';

@Component({
  selector: 'contler-special-requests',
  templateUrl: './special-requests.component.html',
  styleUrls: ['./special-requests.component.scss'],
})
export class SpecialRequestsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['userName', 'roomName', 'description', 'checkIn', 'checkOut', 'actions'];
  dataSource = new MatTableDataSource<SpecialRequest>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  private specialRequestsSubscription: Subscription | null = null;
  public requestStatus = {
    ACTIVE: 'actives',
    ALL: 'all',
  };
  public filterByStatusSelected: string = this.requestStatus.ACTIVE;

  constructor(private specialRequestsService: SpecialRequestsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter === this.requestStatus.ACTIVE) {
        return data.isActive;
      }
      if (filter === this.requestStatus.ALL) {
        return true;
      }
      const response =
        (data.userName && data.userName.toLowerCase().includes(filter)) ||
        (data.roomName && data.roomName.toLowerCase().includes(filter)) ||
        (data.description && data.description.toLowerCase().includes(filter));
      return response ? true : false;
    };
    this.specialRequestsSubscription = this.specialRequestsService.listenSpecialRequestByHotel().subscribe(requests => {
      this.dataSource.data = requests;
    });
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  ngOnDestroy() {
    if (this.specialRequestsSubscription) {
      this.specialRequestsSubscription.unsubscribe();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* update(request: Request) {
    this.dialog.open(ModalInmediateRequestComponent, {
      data: {
        request: Object.assign({}, request),
      },
    });
  } */

  remove(request: SpecialRequest) {}

  filterByStatus() {
    this.dataSource.filter = this.filterByStatusSelected;
  }
}
