import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController, NavParams } from '@ionic/angular';
import { MessagesService } from '../../services/messages/messages.service';
import { GeneralService } from '../../services/general.service';
import { EmployerService } from '../../services/employer.service';
import { SpecialRequestsService } from '../../services/special-requests.service';
import { EmployerEntity, RequestEntity } from '@contler/entity';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'contler-modal-special-request',
  templateUrl: './modal-special-request.page.html',
  styleUrls: ['./modal-special-request.page.scss'],
})
export class ModalSpecialRequestPage implements OnInit, OnDestroy {
  public request: RequestEntity | undefined;

  public employers: EmployerEntity[] = [];
  private subscription: Subscription | null = null;
  employerId = '';
  employer: EmployerEntity | undefined;

  constructor(
    public generalService: GeneralService,
    private navParams: NavParams,
    private employerService: EmployerService,
    private specialRequestsService: SpecialRequestsService,
    private messagesService: MessagesService,
    public modalController: ModalController,
    private auth: AuthService,
    private translate: TranslateService,
  ) {
    this.auth.$user.subscribe((employer) => (this.employer = employer!));
  }

  ngOnInit() {
    this.request = this.navParams.get('request');
    this.employerId = this.request!.solved ? this.request!.solved.uid : '';
    this.subscription = this.employerService
      .getEmployers()
      .subscribe((employers) => (this.employers = employers));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  save() {
    const loader = this.messagesService.showLoader();
    this.request!.solved = this.employers.find((e) => e.uid === this.employerId)!;
    this.request!.attended = this.employer!;
    this.specialRequestsService.updateRequest(this.request!).subscribe(
      () => {
        this.messagesService.closeLoader(loader);
        const msn = this.translate.instant('specialRequest.updateSusses');
        this.messagesService.showToastMessage(msn);
        this.modalController.dismiss();
      },
      (err) => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
        console.error('Hubo un error');
      },
    );
  }
}
