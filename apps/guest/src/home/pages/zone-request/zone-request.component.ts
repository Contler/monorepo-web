import { Component, OnDestroy } from '@angular/core';
import { GuestService } from 'guest/services/guest.service';
import { Hotel, Request } from 'lib/models';
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ZoneService } from 'guest/services/zone.service';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'contler-zone-request',
  templateUrl: './zone-request.component.html',
  styleUrls: ['./zone-request.component.scss'],
})
export class ZoneRequestComponent implements OnDestroy {
  hotel: Hotel | null | undefined;
  requestController = new FormControl('', Validators.required);
  loader = false;
  private subscribe: Subscription;
  private zoneUid: string | null;

  constructor(
    private guestService: GuestService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private afDb: AngularFireDatabase,
  ) {
    this.subscribe = this.guestService.$hotel.subscribe(hotel => (this.hotel = hotel));
    this.zoneUid = this.route.snapshot.paramMap.get('id');
  }

  getColorHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(this.hotel && this.hotel.color ? `color: ${this.hotel.color}` : '');
  }

  saveRequest() {
    this.loader = true;
    this.guestService.$guest
      .pipe(
        map(
          guest =>
            new Request(
              this.afDb.createPushId()!,
              this.hotel!.uid!,
              guest!.uid,
              this.zoneUid!,
              this.requestController.value,
            ),
        ),
        switchMap(request => this.afDb.object(`${Request.REF}/${request.uid}`).set(request.serialize())),
      )
      .subscribe(() => {
        this.loader = false;
        this.requestController.reset();
      });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
