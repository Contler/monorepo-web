import { Component, OnInit, ViewChild } from '@angular/core';
import { WakeService } from 'hotel/wake-up/services/wake.service';
import { WakeUpEntity } from '@contler/entity';
import { AuthService } from 'hotel/services/auth.service';
import { switchMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { WakeTable } from '@contler/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  dataSource = new MatTableDataSource<WakeTable>();

  constructor(private wakeService: WakeService, private authService: AuthService, private datePipe: DatePipe) {
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
      .subscribe(wakes => (this.dataSource.data = this.convertWake(wakes)));
  }

  textFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  getCompleteWake() {
    this.authService.$employer
      .pipe(switchMap(user => this.wakeService.getWakeComplete(user.hotel.uid)))
      .subscribe(wakes => (this.dataSource.data = this.convertWake(wakes)));
  }

  ngOnInit() {}

  private convertWake(wakes: WakeUpEntity[]): WakeTable[] {
    return wakes.map(wake => ({
      id: wake.id,
      name: wake.guest.name + ' ' + wake.guest.lastName,
      room: wake.room.name,
      date: this.datePipe.transform(wake.date, 'dd/MM/yyyy')!,
      time: this.datePipe.transform(wake.time, 'shortTime')!
    }))
  }
}
