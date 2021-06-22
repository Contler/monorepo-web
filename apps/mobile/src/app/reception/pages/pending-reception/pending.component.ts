import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { first } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';
import { DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer } from '../../../reducers/user/user.selectors';

@Component({
  selector: 'contler-reception-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  user: EmployerEntity | null = null;
  filter: DynamicRequestStatus;
  module = MODULES.reception;

  constructor(private store: Store<State>, public menu: MenuController) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }

  ngOnInit() {}
}
