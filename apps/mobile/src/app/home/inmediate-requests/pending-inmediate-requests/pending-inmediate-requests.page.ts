import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { GeneralService } from '../../../services/general.service';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      this.snackBar.open('Esta solicitud fue resuelta', 'cerrar', {
        duration: 5000,
      });
      this.requests = this.requests.filter((req) => req.id !== request.id);
    });
  }
}
