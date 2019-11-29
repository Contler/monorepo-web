import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Guest, GuestRequest, Room } from '@contler/core/models';
import { auth, database, firestore } from 'firebase-admin';

@Injectable()
export class GuestService {
  async createGuest(guestRequest: GuestRequest) {
    await this.validateBusyRoom(guestRequest.room.uid);
    guestRequest.room.busy = true;
    const user = await auth().createUser({
      email: guestRequest.email,
      password: guestRequest.document,
      displayName: guestRequest.name + ' ' + guestRequest.lastName,
    });
    const guest = new Guest();
    guest.uid = user.uid;
    guest.name = guestRequest.name;
    guest.lastName = guestRequest.lastName;
    guest.typeDocument = guestRequest.typeDocument;
    guest.document = guestRequest.document;
    guest.room = guestRequest.room;
    guest.checkIn = guestRequest.checkIn;
    guest.checkOut = guestRequest.checkOut;
    return firestore().doc(`${Guest.REF}/${guest.uid}`).set(guest.serialize());
  }

  // *******************************************************************************************************************
  // Private methods
  // *******************************************************************************************************************

  private async validateBusyRoom(roomId: string) {
    let isBusy = false;
    await database()
      .ref(Room.REF)
      .child(roomId)
      .transaction((room: Room) => {
        if (room) {
          isBusy = room.busy;
          if (!room.busy) {
            room.busy = true;
          }
        }
        return room;
      });
    if (isBusy) {
      throw new HttpException('room is busy', HttpStatus.BAD_REQUEST);
    }
  }
}
