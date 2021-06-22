import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { first } from 'rxjs/operators';
import { GeneralService } from '../../../services/general.service';
import { MenuController } from '@ionic/angular';
import { DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { selectEmployer } from '../../../reducers/user/user.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';

@Component({
  selector: 'contler-reception-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.scss'],
})
export class ReadyComponent implements OnInit {
  user: EmployerEntity | null = null;
  module = MODULES.reception;
  filter = DynamicRequestStatus.ALL;

  constructor(
    private store: Store<State>,
    public generalService: GeneralService,
    public menu: MenuController,
  ) {}

  ngOnInit() {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }
}
