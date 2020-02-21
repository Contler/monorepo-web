import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { GeneralService } from '../../../services/general.service';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'contler-pending-inmediate-requests',
  templateUrl: './pending-inmediate-requests.page.html',
  styleUrls: ['./pending-inmediate-requests.page.scss'],
})
export class PendingInmediateRequestsPage implements OnInit {
  public requests: RequestEntity[] = [];
  user: EmployerEntity | null = null;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private navController: NavController,
    public generalService: GeneralService,
    public modalController: ModalController,
    private auth: AuthService,
    public menu: MenuController,
  ) {
    this.auth.$user.subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.inmediateRequestsService.listenImmediateRequestByHotel(false).subscribe(requests => {
      this.requests = requests;
    });
  }

  async goToRequest(request: RequestEntity) {
    const modal = await this.modalController.create({
      component: ModalInmediateRequestPage,
      componentProps: {
        request: Object.assign({}, request),
      },
    });
    modal.present();
  }
}
