import { Component, OnInit, ViewChild } from '@angular/core';
import { WakeService } from 'hotel/wake-up/services/wake.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { WakeUpEntity } from '@contler/entity';
import { AuthService } from 'hotel/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'contler-wake-up',
  templateUrl: './wake-up.component.html',
  styleUrls: ['./wake-up.component.scss'],
})
export class WakeUpComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  readonly filters = [{ name: 'Pendientes', value: 0 }, { name: 'Completos', value: 1 }];

  filter = 0;

  displayedColumns: string[] = ['name', 'room', 'date', 'time'];
  dataSource = new MatTableDataSource<WakeUpEntity>();

  constructor(private wakeService: WakeService, private authService: AuthService) {
    this.getIncompleteWake();
    this.dataSource.paginator = this.paginator!;
  }

  changeWakeView(event: number) {
    if (event === 0) {
      this.getIncompleteWake();
    } else {
      this.getCompleteWake();
    }
  }

  getIncompleteWake() {
    this.authService.$employer
      .pipe(switchMap(user => this.wakeService.getWakeIncomplete(user.hotel.uid)))
      .subscribe(wakes => (this.dataSource.data = wakes));
  }

  getCompleteWake() {
    this.authService.$employer
      .pipe(switchMap(user => this.wakeService.getWakeComplete(user.hotel.uid)))
      .subscribe(wakes => (this.dataSource.data = wakes));
  }

  ngOnInit() {}
}
