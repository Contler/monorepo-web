import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalSpecialRequestPage } from '../../../modals/modal-special-request/modal-special-request.page';
import { EmployerEntity } from '@contler/entity';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer, selectHotel } from '../../../reducers/user/user.selectors';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { MODULES, RequestMessage, RequestService } from '@contler/dynamic-services';
import { startOfWeek } from 'date-fns';

@Component({
  selector: 'contler-past-special-requests',
  templateUrl: './past-special-requests.page.html',
  styleUrls: ['./past-special-requests.page.scss'],
})
export class PastSpecialRequestsPage implements OnInit {
  user: EmployerEntity | null = null;
  requests$: Observable<RequestMessage[]>;
  count: number;

  constructor(
    private store: Store<State>,
    private requestService: RequestService,
    public modalController: ModalController,
    public menu: MenuController,
  ) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.requests$ = this.store.pipe(
      selectHotel,
      first(),
      switchMap((hotel) =>
        this.requestService
          .getByService(MODULES.special, {
            active: false,
            hotelId: hotel.uid,
            date: startOfWeek(new Date()),
          })
          .valueChanges(),
      ),
      map((data) => data as RequestMessage[]),
      tap((data) => (this.count = data.length)),
    );
  }

  async goToRequest(request: RequestMessage) {
    const modal = await this.modalController.create({
      component: ModalSpecialRequestPage,
      componentProps: {
        request: Object.assign({}, request),
      },
    });
    return await modal.present();
  }
}
