import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectEmployer, selectHotel } from '../../../reducers/user/user.selectors';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { MODULES, RequestMessage, RequestService } from '@contler/dynamic-services';
import { startOfWeek } from 'date-fns';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-ready-inmediate-requests',
  templateUrl: './ready-inmediate-requests.page.html',
  styleUrls: ['./ready-inmediate-requests.page.scss'],
})
export class ReadyInmediateRequestsPage implements OnInit {
  user: EmployerEntity | null = null;
  requests$: Observable<RequestMessage[]>;
  count: number;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private dialog: MatDialog,
    public menu: MenuController,
    private store: Store<State>,
    private requestService: RequestService,
  ) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.requests$ = this.store.pipe(
      selectHotel,
      first(),
      switchMap((hotel) =>
        this.requestService
          .getByService(MODULES.immediate, {
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
    this.dialog.open(ModalInmediateRequestPage, {
      data: request,
      maxWidth: '100vw',
      panelClass: 'modalApp',
    });
  }
}
