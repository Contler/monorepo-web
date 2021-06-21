import { Component, OnInit } from '@angular/core';
import { EmployerEntity } from '@contler/entity';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { GeneralService } from '../../../services/general.service';
import { MenuController } from '@ionic/angular';
import { DynamicRequest, DynamicRequestStatus, RequestService } from '@contler/dynamic-services';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer } from '../../../reducers/user/user.selectors';
import { selectReception } from '../../../reducers/request/request.selectors';

@Component({
  selector: 'contler-reception-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss'],
})
export class PendingComponent implements OnInit {
  user: EmployerEntity | null = null;
  totalReception2: number;
  dynamicReq: Observable<DynamicRequest[]>;
  filter: DynamicRequestStatus;
  constructor(
    private requestService: RequestService,
    private store: Store<State>,
    public generalService: GeneralService,
    public menu: MenuController,
  ) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.dynamicReq = this.store.select(selectReception).pipe(
      map((data) => data.requests as DynamicRequest[]),
      tap((data) => (this.totalReception2 = data.length)),
    );
  }
}
