import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { GeneralService } from '../../../services/general.service';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-pending-inmediate-requests',
  templateUrl: './pending-inmediate-requests.page.html',
  styleUrls: ['./pending-inmediate-requests.page.scss'],
})
export class PendingInmediateRequestsPage implements OnInit {
  public requests: RequestEntity[] = [];
  user: EmployerEntity | null = null;
  loadData = false;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private navController: NavController,
    public generalService: GeneralService,
    private auth: AuthService,
    private dialog: MatDialog,
    public menu: MenuController,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {
    this.auth.$user.subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.loadData = true;
    this.inmediateRequestsService.listenImmediateRequestByHotel(false).subscribe((requests) => {
      this.requests = requests;
      this.loadData = false;
    });
  }

  doRefresh(event: any) {
    this.inmediateRequestsService.listenImmediateRequestByHotel(false).subscribe((requests) => {
      this.requests = requests;
      event.target.complete();
    });
  }

  async goToRequest(request: RequestEntity) {
    this.dialog
      .open(ModalInmediateRequestPage, { data: request, maxWidth: '100vw', panelClass: 'modalApp' })
      .afterClosed()
      .subscribe(() => {
        if (request.complete) {
          this.requests = this.requests.filter((req) => req.id !== request.id);
        }
      });
  }

  completeRequest(request: RequestEntity) {
    request.complete = true;
    this.inmediateRequestsService.updateRequest(request).subscribe(() => {
      const msn = this.translate.instant('immediateRequest.resultError');
      const close = this.translate.instant('global.CLOSE');
      this.snackBar.open(msn, close, {
        duration: 5000,
      });
      this.requests = this.requests.filter((req) => req.id !== request.id);
    });
  }
}
