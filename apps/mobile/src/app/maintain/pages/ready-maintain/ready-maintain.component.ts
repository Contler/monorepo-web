import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { selectEmployer } from '../../../reducers/user/user.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';

@Component({
  selector: 'contler-ready-maintain',
  templateUrl: './ready-maintain.component.html',
  styleUrls: ['./ready-maintain.component.scss'],
})
export class ReadyMaintainComponent implements OnInit {
  user: EmployerEntity | null = null;
  filter: DynamicRequestStatus;
  module = MODULES.maintenance;

  constructor(private store: Store<State>, public menu: MenuController) {}

  ngOnInit() {
    this.store.pipe(selectEmployer).subscribe((user) => (this.user = user));
  }
}
