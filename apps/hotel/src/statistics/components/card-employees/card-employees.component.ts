import { Component, Input, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { ModalEditEmployerComponent } from 'hotel/common-components/modal-edit-employer/modal-edit-employer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'contler-card-employees',
  templateUrl: './card-employees.component.html',
  styleUrls: ['./card-employees.component.scss']
})
export class CardEmployeesComponent implements OnInit {
  @Input() employer: EmployerEntity | undefined;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEmployerEditModal(employer: EmployerEntity) {
    this.dialog.open(ModalEditEmployerComponent, {
      width: '940px',
      data: employer,
    });
  }

}
