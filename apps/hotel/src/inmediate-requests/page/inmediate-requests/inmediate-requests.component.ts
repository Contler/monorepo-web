import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InmediateRequestsService } from 'hotel/inmediate-requests/services/inmediate-requests.service';
import { Subscription } from 'rxjs';
import { Request } from 'lib/models';

@Component({
  selector: 'contler-inmediate-requests',
  templateUrl: './inmediate-requests.component.html',
  styleUrls: ['./inmediate-requests.component.scss'],
})
export class InmediateRequestsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['userName', 'zone', 'message', 'created_at', 'employerName', 'status', 'actions'];
  dataSource = new MatTableDataSource<Request>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  private inmediateRequestsSubscription: Subscription | null = null;

  constructor(private inmediateRequestsService: InmediateRequestsService) {}

  ngOnInit() {
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
}
