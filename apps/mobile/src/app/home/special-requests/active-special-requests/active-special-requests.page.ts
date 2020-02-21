import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuController, ModalController } from '@ionic/angular';
import { SpecialRequestsService } from '../../../services/special-requests.service';
import { GeneralService } from '../../../services/general.service';
import { ModalSpecialRequestPage } from '../../../modals/modal-special-request/modal-special-request.page';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: "contler-active-special-requests",
  templateUrl: "./active-special-requests.page.html",
  styleUrls: ["./active-special-requests.page.scss"]
})
export class ActiveSpecialRequestsPage implements OnInit {
  private specialRequestsSubscription: Subscription | null = null;
  public requests: RequestEntity[] = [];

  public searchRequestsEnabled: boolean | undefined;
  private searchSubscription: Subscription | undefined;
  public requestsResults: RequestEntity[] = [];
  user: EmployerEntity | null = null;

  constructor(
    private specialRequestsService: SpecialRequestsService,
    public generalService: GeneralService,
    public modalController: ModalController,
    private auth: AuthService,
    public menu: MenuController,
  ) {
    this.auth.$user.subscribe(user => (this.user = user));
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.specialRequestsSubscription = this.specialRequestsService
      .listenSpecialRequestByHotel(false)
      .subscribe(requests => {
        this.requests = requests;
      });
    this.searchSubscription = this.generalService.searchToolbar.subscribe(
      (data: any) => {
        this.searchRequestsEnabled = data;
        this.requestsResults.length = 0;
      }
    );
  }

  ionViewWillLeave() {
    if (this.specialRequestsSubscription) {
      this.specialRequestsSubscription.unsubscribe();
    }
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  searchRequests(term: string) {
    this.requestsResults = this.requests.filter(request => {
      if (request.guest.name!.toLowerCase().includes(term)) {
        return true;
      }
      if (request.message!.toLowerCase().includes(term)) {
        return true;
      }
      if (request.room.name!.toLowerCase().includes(term)) {
        return true;
      }
      return false;
    });
  }

  async goToRequest(request: RequestEntity) {
    const modal = await this.modalController.create({
      component: ModalSpecialRequestPage,
      componentProps: {
        request: Object.assign({}, request)
      }
    });
    return await modal.present();
  }
}
