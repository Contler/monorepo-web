import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { DynamicRequest, DynamicRequestStatus, receptionDynamicConverter } from '@contler/dynamic-services';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MessagesService } from '../../../services/messages/messages.service';

@Component({
  selector: 'contler-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.scss'],
})
export class DetailRequestComponent {
  request: Observable<DynamicRequest>;
  listStatus = [
    DynamicRequestStatus.PROGRAMING,
    DynamicRequestStatus.ATTENDED,
    DynamicRequestStatus.COMPLETED,
  ];
  statusRequest = DynamicRequestStatus;
  hiddenButton = false;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private messagesService: MessagesService,
  ) {
    const reference = this.db.firestore.collection('dynamicRequest').withConverter(receptionDynamicConverter);
    this.request = this.route.params.pipe(
      map(({ id }) => id),
      switchMap((id) => this.db.collection<DynamicRequest>(reference).doc(id).valueChanges()),
      tap((request) => (this.hiddenButton = request.status === this.statusRequest.COMPLETED)),
    );
  }

  public async onUpdateRequest(rq: DynamicRequest): Promise<void> {
    const reference = this.db.firestore.collection('dynamicRequest').withConverter(receptionDynamicConverter);
    const loader = this.messagesService.showLoader();
    try {
      await this.db.collection<DynamicRequest>(reference).doc(rq.key).update(rq);
      this.hiddenButton = true;
      this.messagesService.closeLoader(loader);
    } catch (e) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }
}
