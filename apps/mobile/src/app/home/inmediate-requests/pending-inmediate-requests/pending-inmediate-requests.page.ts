import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { EmployerEntity } from '@contler/entity';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { selectImmediate } from '../../../reducers/request/request.selectors';
import { first, map, tap } from 'rxjs/operators';
import { DynamicRequestStatus, RequestMessage, RequestService } from '@contler/dynamic-services';
import { Observable } from 'rxjs';
import { selectEmployer } from '../../../reducers/user/user.selectors';

@Component({
  selector: 'contler-pending-inmediate-requests',
  templateUrl: './pending-inmediate-requests.page.html',
  styleUrls: ['./pending-inmediate-requests.page.scss'],
})
export class PendingInmediateRequestsPage implements OnInit {
  user: EmployerEntity | null = null;
  loadData = false;
  total: number;
  requests$: Observable<RequestMessage[]>;

  constructor(
    private navController: NavController,
    private dialog: MatDialog,
    public menu: MenuController,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private store: Store<State>,
    private requestService: RequestService,
  ) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.loadData = true;

    this.requests$ = this.store.select(selectImmediate).pipe(
      tap((data) => (this.total = data.count)),
      map((data) => data.requests as RequestMessage[]),
      tap(() => (this.loadData = false)),
    );
  }

  async goToRequest(request: RequestMessage) {
    this.dialog
      .open(ModalInmediateRequestPage, { data: request, maxWidth: '100vw', panelClass: 'modalApp' })
      .afterClosed();
  }

  completeRequest(request: RequestMessage) {
    this.requestService.changeStatus(request.key, DynamicRequestStatus.COMPLETED).then(() => {
      const msn = this.translate.instant('immediateRequest.resultError');
      const close = this.translate.instant('global.CLOSE');
      this.snackBar.open(msn, close, {
        duration: 5000,
      });
    });
  }
}
