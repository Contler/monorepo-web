import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmployerComponent } from 'hotel/employer/components/modal-employer/modal-employer.component';

@Component({
  selector: 'contler-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss'],
})
export class EmployerComponent {
  readonly filters = [
    { name: 'Líder de área', value: 0 },
    { name: 'Empleados', value: 1 },
    { name: 'Todos', value: 2 },
  ];

  filter = 0;

  constructor(private dialog: MatDialog) {
    this.openEmployerModal()
  }

  openEmployerModal() {
    this.dialog.open(ModalEmployerComponent, {width: '940px', disableClose: true})
  }


}
