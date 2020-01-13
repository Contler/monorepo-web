import { Component } from '@angular/core';
import { DOCUMENT_TYPE } from '@contler/const';
import { MatDialogRef } from '@angular/material/dialog';
import { GuestRequest, Room } from '@contler/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'hotel/room/services/room.service';
import { map, switchMap, take } from 'rxjs/operators';
import { GuestService } from 'hotel/guest/services/guest.service';
import { UserService } from '@contler/core';

@Component({
  selector: 'contler-model-new-guest',
  templateUrl: './model-new-guest.component.html',
  styleUrls: ['./model-new-guest.component.scss'],
})
export class ModelNewGuestComponent {
  readonly documentTypes = DOCUMENT_TYPE;

  guestGroup: FormGroup;
  rooms: Room[] = [];
  load = false;
  error: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModelNewGuestComponent>,
    private roomService: RoomService,
    private guestService: GuestService,
    private userService: UserService,
    formBuild: FormBuilder,
  ) {
    this.guestGroup = formBuild.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typeDocument: ['', Validators.required],
      document: ['', Validators.required],
      room: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
    this.roomService
      .getRoom()
      .pipe(map(rooms => rooms.filter(room => !room.busy)))
      .subscribe(rooms => {
        this.rooms = rooms;
        this.room!.reset();
      });
  }

  saveUser() {
    this.error = undefined;
    this.load = true;
    this.userService
      .getUser()
      .pipe(
        take(1),
        map(user => ({ ...this.guestGroup.value, hotel: user.hotel } as GuestRequest)),
        switchMap(guestRequest => this.guestService.saveGuest(guestRequest)),
      )
      .subscribe(
        () => {
          this.load = false;
          this.dialogRef.close();
        },
        error => {
          this.load = false;
          if (error.status === 400) {
            this.error = 'La Habitación ya fue ocupada';
          } else {
            this.error = 'No pudimos crear el usuario';
          }
        },
      );
  }

  get room() {
    return this.guestGroup.get('room');
  }
}
