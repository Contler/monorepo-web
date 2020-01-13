import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Employer, Request } from '@contler/models';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages/messages.service';
import { GeneralService } from '../../services/general.service';
import { EmployerService } from '../../services/employer.service';
import { InmediateRequestsService } from '../../services/inmediate-requests.service';
import { SUB_CATEGORY_DRINKS } from '@contler/const';


@Component({
  selector: "contler-modal-inmediate-request",
  templateUrl: "./modal-inmediate-request.page.html",
  styleUrls: ["./modal-inmediate-request.page.scss"]
})
export class ModalInmediateRequestPage implements OnInit, OnDestroy {
  public request: Request | undefined;

  public employers: Employer[] = [];
  private subscription: Subscription | null = null;
  public isFinished = false;

  public readonly DRINKS_SUBCATEGORY = SUB_CATEGORY_DRINKS;

  constructor(
    public generalService: GeneralService,
    private navParams: NavParams,
    private employerService: EmployerService,
    private inmediateRequestsService: InmediateRequestsService,
    private messagesService: MessagesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.request = this.navParams.get("request");
    this.isFinished = this.request!.complete;
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
    if (this.isFinished && !this.request!.complete) {
      this.request!.finished_at = new Date().getTime();
      this.request!.complete = true;
    }
    this.inmediateRequestsService
      .updateRequest(this.request!.uid, this.request)
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
