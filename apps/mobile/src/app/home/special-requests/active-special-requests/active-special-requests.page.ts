import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalSpecialRequestPage } from '../../../modals/modal-special-request/modal-special-request.page';
import { EmployerEntity } from '@contler/entity';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer } from '../../../reducers/user/user.selectors';
import { first, map, tap } from 'rxjs/operators';
import { selectSpecial } from '../../../reducers/request/request.selectors';
import { RequestMessage } from '@contler/dynamic-services';

@Component({
  selector: 'contler-active-special-requests',
  templateUrl: './active-special-requests.page.html',
  styleUrls: ['./active-special-requests.page.scss'],
})
export class ActiveSpecialRequestsPage implements OnInit {
  searchRequestsEnabled: boolean | undefined;
  user: EmployerEntity | null = null;
  total: number;
  requests$: Observable<RequestMessage[]>;

  constructor(
    private store: Store<State>,
    public modalController: ModalController,
    public menu: MenuController,
  ) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.requests$ = this.store.select(selectSpecial).pipe(
      tap((data) => (this.total = data.count)),
      map((data) => data.requests as RequestMessage[]),
    );
  }

  async goToRequest(request: RequestMessage) {
    const modal = await this.modalController.create({
      component: ModalSpecialRequestPage,
      componentProps: {
        request: { ...request },
      },
    });
    return await modal.present();
  }
}
