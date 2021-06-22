import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer } from '../../../reducers/user/user.selectors';

@Component({
  selector: 'contler-pending-cleaning',
  templateUrl: './pending-cleaning.component.html',
  styleUrls: ['./pending-cleaning.component.scss'],
})
export class PendingCleaningComponent implements OnInit {
  user: EmployerEntity | null = null;
  filter: DynamicRequestStatus;
  module = MODULES.cleaning;
  constructor(private store: Store<State>, public menu: MenuController) {}

  ngOnInit() {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }
}
