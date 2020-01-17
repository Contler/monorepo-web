import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalEmployerComponent } from 'hotel/employer/components/modal-employer/modal-employer.component';
import { Employer } from '@contler/models';
import { EmployerService } from 'hotel/employer/services/employer.service';
import { Subscription } from 'rxjs';
import { CHIEF } from '@contler/const';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalRemoveEmployerComponent } from 'hotel/employer/components/modal-remove-employer/modal-remove-employer.component';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LoaderComponent } from 'hotel/material/components/loader/loader.component';
import { EmployerEntity } from '@contler/entity';
import { ModalEditEmployerComponent } from 'hotel/common-components/modal-edit-employer/modal-edit-employer.component';

@Component({
  selector: 'contler-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent implements OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;

  readonly leader = CHIEF;
  readonly filters = [
    { name: 'Líder de área', value: 0 },
    { name: 'Empleados', value: 1 },
    { name: 'Todos', value: 2 },
  ];

  filter = 0;
  displayedColumns: string[] = ['name', 'leader', 'score', 'request', 'options'];
  dataSource = new MatTableDataSource<EmployerEntity>();
  private subscription: Subscription;

  constructor(private dialog: MatDialog, private employerService: EmployerService) {
    this.subscription = this.employerService.getEmployers().subscribe(employers => (this.dataSource.data = employers));
    this.dataSource.paginator = this.paginator!;
  }

  openEmployerModal() {
    this.dialog.open<ModalEmployerComponent, void, Employer>(ModalEmployerComponent, {
      width: '940px',
    });
  }

  openEmployerEditModal(employer: EmployerEntity) {
    this.dialog.open(ModalEditEmployerComponent, {
      width: '940px',
      data: employer,
    });
  }

  openCloseModal(employer: EmployerEntity) {
    let ref: MatDialogRef<LoaderComponent>;
    this.dialog
      .open(ModalRemoveEmployerComponent, { width: '452px' })
      .afterClosed()
      .pipe(
        filter(data => !!data),
        tap(() => (ref = this.dialog.open(LoaderComponent))),
        switchMap(() => this.employerService.deleteEmployer(employer.uid)),
      )
      .subscribe(() => {
        if (ref) {
          this.dataSource.data = this.dataSource.data.filter(e => e.uid !== employer.uid);
          ref.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
