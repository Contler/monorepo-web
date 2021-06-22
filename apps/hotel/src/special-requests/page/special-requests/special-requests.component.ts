import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MODULES, RequestMessage, RequestService } from '@contler/dynamic-services';
import { AuthService } from '@contler/hotel/services/auth.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-special-requests',
  templateUrl: './special-requests.component.html',
  styleUrls: ['./special-requests.component.scss'],
})
export class SpecialRequestsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['userName', 'roomName', 'description', 'checkIn', 'checkOut', 'actions'];
  dataSource = new MatTableDataSource<RequestMessage>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  private specialRequestsSubscription: Subscription | null = null;
  public requestStatus = {
    ACTIVE: 'actives',
    ALL: 'all',
  };
  public filterByStatusSelected: string = this.requestStatus.ACTIVE;

  constructor(private requestService: RequestService, private dialog: MatDialog, private auth: AuthService) {}

  ngOnInit() {
    this.dataSource.filter = this.filterByStatusSelected;
    this.dataSource.filterPredicate = (data, filter) => {
      if (filter === this.requestStatus.ACTIVE) {
        return data.active;
      }
      if (filter === this.requestStatus.ALL) {
        return true;
      }
      return (
        data.guest?.name.toLowerCase().includes(filter) ||
        data.guest?.room?.name.toLowerCase().includes(filter) ||
        (data.message && data.message.toLowerCase().includes(filter))
      );
    };
    this.specialRequestsSubscription = this.auth.$hotel
      .pipe(
        first(),
        switchMap((hotel) =>
          this.requestService.getByService(MODULES.special, { hotelId: hotel.uid }).valueChanges(),
        ),
      )
      .subscribe((requests) => {
        this.dataSource.data = requests as RequestMessage[];
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

  filterByStatus() {
    this.dataSource.filter = this.filterByStatusSelected;
  }
}
