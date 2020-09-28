import { Component, OnInit, OnDestroy } from '@angular/core';
import { SUB_CATEGORY_ROOM } from '@contler/const';
import { HotelEntity } from '@contler/entity';
import { GuestService } from 'guest/services/guest.service';
import { MessagesService } from 'guest/services/messages/messages.service';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RoomKeyModel } from '@contler/models';
import { RoomKeyService } from '@contler/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfigModel } from '@contler/models/modal-config.model';
import { ModalCompleteComponent } from 'guest/common-components/modal-complete/modal-complete.component';

@Component({
  selector: 'contler-my-room',
  templateUrl: './my-room.component.html',
  styleUrls: ['./my-room.component.scss'],
})
export class MyRoomComponent implements OnInit, OnDestroy {
  categories = SUB_CATEGORY_ROOM;
  hotel: HotelEntity | null | undefined;
  selectedSubcategory = '';
  showRequestField = false;
  loader = false;

  private guestSubscribe: Subscription;

  constructor(
    private guestService: GuestService,
    private router: Router,
    private messagesService: MessagesService,
    private roomKeyService: RoomKeyService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.guestSubscribe = this.guestService.$hotel.subscribe((hotel) => (this.hotel = hotel));
  }

  async saveRequest() {
    this.loader = true;
    const msg = this.selectedSubcategory ? this.selectedSubcategory : '';

    const modalConfig: ModalConfigModel = {
      text: 'Your request has been succesfully received.',
      close: 'Got it!',
      icon: 'fas fa-check-circle',
    };

    this.guestService.$guest
      .pipe(
        map(
          (guest) =>
            ({
              time: new Date(),
              nameRequest: msg,
              guest: guest.uid,
              hotel: guest.hotel.uid,
            } as RoomKeyModel),
        ),
        switchMap((request) => this.roomKeyService.createRequest(request)),
        switchMap(() =>
          this.dialog
            .open<ModalCompleteComponent, ModalConfigModel>(ModalCompleteComponent, {
              data: modalConfig,
            })
            .afterClosed(),
        ),
      )
      .subscribe(
        () => {
          this.loader = false;
          this.router.navigate(['/home/guest-requests']);
        },
        () => {
          this.loader = false;
          this.messagesService.showServerError();
        },
      );
  }

  ngOnDestroy(): void {
    if (this.guestSubscribe) {
      this.guestSubscribe.unsubscribe();
    }
  }

  subCategorySelected(value: string) {
    this.selectedSubcategory = value;
  }

  buttonDisabled() {
    let disabledButton = false;
    if (!this.selectedSubcategory) {
      disabledButton = true;
    } else if (this.selectedSubcategory === 'Other') {
      disabledButton = true;
    }
    return disabledButton;
  }
}
