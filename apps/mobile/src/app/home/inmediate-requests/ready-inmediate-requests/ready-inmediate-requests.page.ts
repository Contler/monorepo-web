import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalInmediateRequestPage } from '../../../modals/modal-inmediate-request/modal-inmediate-request.page';
import { InmediateRequestsService } from '../../../services/inmediate-requests.service';
import { GeneralService } from '../../../services/general.service';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'contler-ready-inmediate-requests',
  templateUrl: './ready-inmediate-requests.page.html',
  styleUrls: ['./ready-inmediate-requests.page.scss'],
})
export class ReadyInmediateRequestsPage implements OnInit {
  private inmediateRequestsSubscription: Subscription | null = null;
  public requests: RequestEntity[] = [];
  user: EmployerEntity | null = null;

  constructor(
    private inmediateRequestsService: InmediateRequestsService,
    public generalService: GeneralService,
    public modalController: ModalController,
    private auth: AuthService,
    public menu: MenuController,
  ) {
    this.auth.$user.subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.inmediateRequestsSubscription = this.inmediateRequestsService
      .listenImmediateRequestByHotel(true)
      .subscribe(requests => {
        this.requests = requests;
      });
  }

  ionViewWillLeave() {
    if (this.inmediateRequestsSubscription) {
      this.inmediateRequestsSubscription.unsubscribe();
    }
  }

  async goToRequest(request: RequestEntity) {
    const modal = await this.modalController.create({
      component: ModalInmediateRequestPage,
      componentProps: {
        request: Object.assign({}, request)
      }
    });
    return await modal.present();
  }
}
