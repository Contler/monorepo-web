import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '@contler/models';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'contler-ready-inmediate-requests',
  templateUrl: './ready-inmediate-requests.page.html',
  styleUrls: ['./ready-inmediate-requests.page.scss'],
})
export class ReadyInmediateRequestsPage implements OnInit {
  private inmediateRequestsSubscription: Subscription | null = null;
  public requests: Request[] = [];

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    public generalService: GeneralService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenInmediateRequestByHotel()
      .pipe(map(data => data.filter(request => request.finished_at)))
      .subscribe(requests => {
        this.requests = requests;
      });
  }

  ionViewWillLeave() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }

  async goToRequest(request: Request) {
    const modal = await this.modalController.create({
      component: ModalInmediateRequestPage,
      componentProps: {
        request: Object.assign({}, request)
      }
    });
    return await modal.present();
  }
}
