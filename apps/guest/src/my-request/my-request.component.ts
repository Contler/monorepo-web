import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DynamicRequest, receptionDynamicConverter } from '@contler/dynamic-services';
import { GuestService } from '../services/guest.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss'],
})
export class MyRequestComponent implements OnInit {
  request: Observable<DynamicRequest[]>;

  constructor(private db: AngularFirestore, private guestService: GuestService) {}

  ngOnInit(): void {
    const reference = this.db.firestore.collection('dynamicRequest').withConverter(receptionDynamicConverter);
    this.request = this.guestService.$guest.pipe(
      switchMap((user) =>
        this.db
          .collection<DynamicRequest>(reference, (ref) =>
            ref.where('guestId', '==', user.uid).where('active', '==', true),
          )
          .valueChanges(),
      ),
    );
  }
}
