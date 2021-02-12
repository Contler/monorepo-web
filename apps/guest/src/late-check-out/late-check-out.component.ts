import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HotelEntity } from '@contler/entity';
import { map, take } from 'rxjs/operators';
import { GuestService } from 'guest/services/guest.service';
import { CreateLateComponent } from 'guest/late-check-out/modal/create-late/create-late.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LateCheck } from '@contler/models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'contler-late-check-out',
  templateUrl: './late-check-out.component.html',
  styleUrls: ['./late-check-out.component.scss'],
})
export class LateCheckOutComponent implements OnInit {
  hotel: HotelEntity | null | undefined;
  lateList: Observable<LateCheck[]> | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private guestService: GuestService,
    private dialog: MatDialog,
    private afFirestore: AngularFirestore,
  ) {
    this.guestService.$hotel.pipe(take(1)).subscribe((hotel) => (this.hotel = hotel));
    this.guestService.$guest.subscribe((guest) => {
      this.lateList = this.afFirestore
        .collection<LateCheck>('late', (ref) => ref.where('user', '==', guest!.uid))
        .valueChanges()
        .pipe(
          map((list) =>
            list.map((item) => {
              item.date = new Date(item.date);
              return item;
            }),
          ),
        );
    });
  }

  ngOnInit() {}

  createLate() {
    this.dialog.open(CreateLateComponent);
  }

  getColorButtonHotel() {
    return this.sanitizer.bypassSecurityTrustStyle(
      this.hotel && this.hotel.color ? `background: ${this.hotel.color};  color: #ffffff !important` : '',
    );
  }
}
