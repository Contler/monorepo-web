import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { DynamicRequest, receptionDynamicConverter } from '@contler/dynamic-services';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'contler-detail-request',
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.component.scss'],
})
export class DetailRequestComponent implements OnInit {
  request: Observable<DynamicRequest>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    const reference = this.db.firestore.collection('dynamicRequest').withConverter(receptionDynamicConverter);
    this.request = this.route.params.pipe(
      map(({ id }) => id),
      switchMap((id) => this.db.collection<DynamicRequest>(reference).doc(id).valueChanges()),
    );
  }

  ngOnInit(): void {}
}
