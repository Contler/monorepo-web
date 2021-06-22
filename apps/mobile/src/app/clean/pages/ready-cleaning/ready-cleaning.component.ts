import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { MenuController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { GeneralService } from '../../../services/general.service';
import { DynamicRequestStatus, MODULES } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer } from '../../../reducers/user/user.selectors';

@Component({
  selector: 'contler-ready-cleaning',
  templateUrl: './ready-cleaning.component.html',
  styleUrls: ['./ready-cleaning.component.scss'],
})
export class ReadyCleaningComponent implements OnInit {
  user: EmployerEntity | null = null;
  filter = DynamicRequestStatus.ALL;
  module = MODULES.cleaning;

  constructor(
    private store: Store<State>,
    public generalService: GeneralService,
    public menu: MenuController,
  ) {}

  ngOnInit() {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }
}
