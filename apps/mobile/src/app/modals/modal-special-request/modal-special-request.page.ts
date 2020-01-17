import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpecialRequest } from '@contler/models';
import { Subscription } from 'rxjs';
import { ModalController, NavParams } from '@ionic/angular';
import { MessagesService } from '../../services/messages/messages.service';
import { GeneralService } from '../../services/general.service';
import { EmployerService } from '../../services/employer.service';
import { SpecialRequestsService } from '../../services/special-requests.service';
import { EmployerEntity } from '@contler/entity';


@Component({
  selector: "contler-modal-special-request",
  templateUrl: "./modal-special-request.page.html",
  styleUrls: ["./modal-special-request.page.scss"]
})
export class ModalSpecialRequestPage implements OnInit, OnDestroy {
  public request: SpecialRequest | undefined;

  public employers: EmployerEntity[] = [];
  private subscription: Subscription | null = null;
  public isFinished = false;

  constructor(
    public generalService: GeneralService,
    private navParams: NavParams,
    private employerService: EmployerService,
    private specialRequestsService: SpecialRequestsService,
    private messagesService: MessagesService,
    private modalController: ModalController,
  ) {

  }

  ngOnInit() {
    this.request = this.navParams.get("request");
    this.isFinished = !this.request!.isActive;
    this.subscription = this.employerService
      .getEmployers()
      .subscribe(employers => (this.employers = employers));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    const loader = this.messagesService.showLoader();
    const employerToFind: string = this.request!.employer || "";
    const employerFound = this.employers.find(
      employer => employer.uid === employerToFind
    );
    if (employerFound) {
      this.request!.employer = employerFound.uid;
      this.request!.employerName = `${employerFound.name} ${employerFound.lastName}`;
    }
    this.request!.isActive = !this.isFinished;
    this.specialRequestsService
      .updateRequest(this.request!.uid!, this.request)
      .then(() => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showToastMessage(
          "Solicitud modificada exitosamente"
        );
        this.modalController.dismiss();
      })
      .catch(() => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
        console.error("Hubo un error");
      });
  }
}
