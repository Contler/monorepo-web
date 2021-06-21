import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MessagesService } from '../../services/messages/messages.service';
import { EmployerService } from '../../services/employer.service';
import { EmployerEntity } from '@contler/entity';
import { TranslateService } from '@ngx-translate/core';
import { selectEmployer } from '../../reducers/user/user.selectors';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { DynamicRequestStatus, RequestMessage, RequestService } from '@contler/dynamic-services';

@Component({
  selector: 'contler-modal-special-request',
  templateUrl: './modal-special-request.page.html',
  styleUrls: ['./modal-special-request.page.scss'],
})
export class ModalSpecialRequestPage implements OnInit {
  request: RequestMessage;
  employers: EmployerEntity[] = [];
  employerId: string;
  employer: EmployerEntity;
  actualStatus: DynamicRequestStatus;
  status = DynamicRequestStatus;

  constructor(
    private store: Store<State>,
    private requestService: RequestService,
    private navParams: NavParams,
    private employerService: EmployerService,
    private messagesService: MessagesService,
    public modalController: ModalController,
    private translate: TranslateService,
  ) {
    this.store.pipe(selectEmployer, first()).subscribe((user) => (this.employer = user));
  }

  ngOnInit() {
    this.request = this.navParams.get('request');
    this.actualStatus = this.request.status;
    this.employerId = this.request?.assigned?.uid;
    this.employerService
      .getEmployers()
      .pipe(first())
      .subscribe((employers) => (this.employers = employers));
  }

  save() {
    const loader = this.messagesService.showLoader();
    const emp = this.employers.find((e) => e.uid === this.employerId)!;
    this.requestService
      .changeStatus(this.request.key, this.actualStatus, emp)
      .then(() => {
        this.messagesService.closeLoader(loader);
        const msn = this.translate.instant('specialRequest.updateSusses');
        this.messagesService.showToastMessage(msn);
        this.modalController.dismiss();
      })
      .catch((err) => {
        this.messagesService.closeLoader(loader);
        this.messagesService.showServerError();
        console.error(err);
      });
  }
}
