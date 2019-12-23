import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpecialRequest } from '@contler/core/models';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { SpecialRequestsService } from '../../../services/special-requests.service';
import { GeneralService } from '../../../services/general.service';
import { ModalSpecialRequestPage } from '../../../modals/modal-special-request/modal-special-request.page';

@Component({
  selector: "contler-past-special-requests",
  templateUrl: "./past-special-requests.page.html",
  styleUrls: ["./past-special-requests.page.scss"]
})
export class PastSpecialRequestsPage implements OnInit {
  private specialRequestsSubscription: Subscription | null = null;
  public requests: SpecialRequest[] = [];

  public searchRequestsEnabled: boolean | undefined;
  private searchSubscription: Subscription | undefined;
  public requestsResults: SpecialRequest[] = [];

  constructor(
    private specialRequestsService: SpecialRequestsService,
    public generalService: GeneralService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.specialRequestsSubscription = this.specialRequestsService
      .listenSpecialRequestByHotel()
      .pipe(map(data => data.filter(request => !request.isActive)))
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
      if (request.userName!.toLowerCase().includes(term)) {
        return true;
      }
      if (request.description!.toLowerCase().includes(term)) {
        return true;
      }
      if (request.roomName!.toLowerCase().includes(term)) {
        return true;
      }
      return false;
    });
  }

  async goToRequest(request: Request | SpecialRequest) {
    const modal = await this.modalController.create({
      component: ModalSpecialRequestPage,
      componentProps: {
        request: Object.assign({}, request)
      }
    });
    return await modal.present();
  }
}
