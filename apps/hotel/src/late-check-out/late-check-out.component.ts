import { Component, OnInit } from '@angular/core';
import { LateCheckOutService } from '@contler/core';
import { switchMap, take } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { LateCheckUser } from '@contler/models';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'contler-late-check-out',
  templateUrl: './late-check-out.component.html',
  styleUrls: ['./late-check-out.component.scss'],
})
export class LateCheckOutComponent implements OnInit {
  displayedColumns: string[] = ['name', 'room', 'hour', 'checkOut', 'state', 'actions'];
  dataSource = new MatTableDataSource<LateCheckUser>();

  constructor(
    private lateService: LateCheckOutService,
    private auth: AuthService,
    private datePipe: DatePipe,
  ) {
    this.auth.$employer
      .pipe(
        take(1),
        switchMap((employer) => this.lateService.getLateByHotel(employer!.hotel.uid)),
      )
      .subscribe((data) => (this.dataSource.data = [...data]));
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (item, filter) => {
      const textLow = filter.toLowerCase();
      const status = item.status === 0 ? 'Creada' : item.status === 1 ? 'No aceptada' : 'Aceptada';
      return (
        item.user.room.name.toLowerCase().includes(textLow) ||
        this.datePipe.transform(item.date, 'shortTime')!.toLowerCase().includes(textLow) ||
        status.toLowerCase().includes(textLow) ||
        item.user.name.toLowerCase().includes(textLow) ||
        item.user.lastName.toLowerCase().includes(textLow)
      );
    };
  }

  acceptLate(item: any) {
    item.status = 2;
    this.lateService.changeStatusLate(2, item.uid);
  }

  cancelLate(item: any) {
    item.status = 1;
    this.lateService.changeStatusLate(1, item.uid);
  }

  applyFilter(target: any) {
    const { value }: { value: string } = target;
    this.dataSource.filter = value;
  }
}
