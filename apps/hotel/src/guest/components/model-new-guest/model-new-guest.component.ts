import { Component } from '@angular/core';
import { DOCUMENT_TYPE } from '@contler/const';
import { MatDialogRef } from '@angular/material/dialog';
import { GuestRequest } from '@contler/models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'hotel/room/services/room.service';
import { map, switchMap } from 'rxjs/operators';
import { GuestService } from 'hotel/guest/services/guest.service';
import { UserService } from '@contler/core';
import { GuestEntity, RoomEntity } from '@contler/entity';
import { MessagesService } from 'hotel/services/messages/messages.service';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'contler-model-new-guest',
  templateUrl: './model-new-guest.component.html',
  styleUrls: ['./model-new-guest.component.scss'],
})
export class ModelNewGuestComponent {
  readonly documentTypes = DOCUMENT_TYPE;

  guestGroup: FormGroup;
  rooms: RoomEntity[] = [];
  load = false;
  error: string | undefined;
  searchEmailForm: FormControl;
  updateGuest = false;
  private guest: GuestEntity;

  constructor(
    public dialogRef: MatDialogRef<ModelNewGuestComponent>,
    private roomService: RoomService,
    private guestService: GuestService,
    private userService: UserService,
    formBuild: FormBuilder,
    private messagesService: MessagesService,
  ) {
    this.searchEmailForm = new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)]),
    );
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
      .pipe(map((rooms) => rooms.filter((room) => !room.guest)))
      .subscribe((rooms) => {
        this.rooms = rooms;
        this.room!.reset();
      });
  }

  get room() {
    return this.guestGroup.get('room');
  }

  saveUser() {
    this.error = undefined;
    this.load = true;
    if (this.updateGuest) {
      this.onUpdateGuest();
      return;
    }
    this.userService
      .getUser()
      .pipe(
        map((user) => ({ ...this.guestGroup.value, hotel: user.hotel } as GuestRequest)),
        switchMap((guestRequest) => this.guestService.saveGuest(guestRequest)),
      )
      .subscribe(
        (guest) => {
          this.load = false;
          this.dialogRef.close(guest);
        },
        (error) => {
          this.load = false;
          if (error.status === 400) {
            if (error.error && error.error.message) {
              this.error = error.error.message;
            } else {
              this.error = 'La Habitación ya fue ocupada';
            }
          } else {
            this.error = 'No pudimos crear el usuario';
          }
        },
      );
  }

  public async searchGuest(stepper: MatHorizontalStepper): Promise<void> {
    const email = this.searchEmailForm.value;
    const loader = this.messagesService.showLoader();
    try {
      this.guest = await this.guestService.searchGuestByEmail(email).toPromise();
      if (this.guest) {
        this.guestGroup.patchValue(this.guest);
        this.updateGuest = true;
      } else {
        this.guestGroup.reset();
        this.guestGroup.get('email').setValue(this.searchEmailForm.value);
        this.updateGuest = false;
      }
      this.messagesService.closeLoader(loader);
      stepper.next();
    } catch (err) {
      this.messagesService.closeLoader(loader);
      this.messagesService.showServerError();
    }
  }

  private onUpdateGuest(): void {
    const { name, lastName, email, typeDocument, document, room, checkIn, checkOut } = this.guestGroup.value;
    this.guest = {
      ...this.guest,
      name,
      lastName,
      email,
      typeDocument,
      document,
      room,
      checkIn,
      checkOut,
    };
    this.userService
      .getUser()
      .pipe(
        map((user) => ({ ...this.guest, hotel: user.hotel } as GuestEntity)),
        switchMap((guestRequest) => this.guestService.updateGuest(guestRequest)),
      )
      .subscribe(
        (guest) => {
          this.load = false;
          this.dialogRef.close(guest);
        },
        (error) => {
          this.load = false;
          if (error.status === 400) {
            if (error.error && error.error.message) {
              this.error = error.error.message;
            } else {
              this.error = 'La Habitación ya fue ocupada';
            }
          } else {
            this.error = 'No pudimos actualizar el usuario';
          }
        },
      );
  }
}
