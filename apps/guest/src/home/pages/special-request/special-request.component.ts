import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAnalytics } from '@angular/fire/analytics';

import { first, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { RequestRequest } from '@contler/models/request-request';

import { MessagesService } from 'guest/services/messages/messages.service';
import { RequestService } from 'guest/services/request.service';
import { State } from 'guest/app/reducers';
import { selectUserState } from 'guest/app/reducers/user/user.selectors';

@Component({
  selector: 'contler-special-request',
  templateUrl: './special-request.component.html',
  styleUrls: ['./special-request.component.scss'],
})
export class SpecialRequestComponent {
  loader = false;
  description: string | null = null;

  constructor(
    private requestService: RequestService,
    private router: Router,
    private messagesService: MessagesService,
    private translate: TranslateService,
    private analytics: AngularFireAnalytics,
    private store: Store<State>,
  ) {}

  async saveRequest() {
    this.loader = true;
    this.store
      .pipe(
        selectUserState,
        first(),
        map(({ user, hotel }) => {
          const request = new RequestRequest();
          request.hotel = hotel;
          request.guest = user;
          request.room = user!.room;
          request.special = true;
          request.message = this.description!;
          return request;
        }),
        switchMap((request) => this.requestService.saveRequest(request)),
      )
      .subscribe(
        () => {
          this.analytics
            .logEvent('request_create', {
              type: 'special',
              requestMessage: this.description,
              time: new Date(),
            })
            .then(() => {
              this.loader = false;
              this.router.navigate(['/home']);
            });
          this.messagesService.showToastMessage(
            this.translate.instant('specialRequest.immediateRequestSuccessfullyCreated'),
          );
        },
        () => {
          this.loader = false;
          this.messagesService.showToastMessage(
            this.translate.instant('specialRequest.errorCreatingRequest'),
          );
        },
      );
  }
}
