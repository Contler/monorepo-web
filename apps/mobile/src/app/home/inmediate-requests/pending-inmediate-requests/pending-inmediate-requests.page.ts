import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { GeneralService } from '../../../services/general.service';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { RequestEntity } from '@contler/entity';

@Component({
  selector: 'contler-pending-inmediate-requests',
  templateUrl: './pending-inmediate-requests.page.html',
  styleUrls: ['./pending-inmediate-requests.page.scss'],
})
export class PendingInmediateRequestsPage implements OnInit {
  public requests: RequestEntity[] = [];

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    private navController: NavController,
    public generalService: GeneralService,
    public modalController: ModalController,
  ) {}

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
