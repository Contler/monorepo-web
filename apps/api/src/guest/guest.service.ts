import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Claim, Guest, GuestRequest, Room } from '@contler/models';
import { auth, database, firestore } from 'firebase-admin';
import { GUEST } from '@contler/const';

@Injectable()
export class GuestService {
  async createGuest(guestRequest: GuestRequest) {
    await this.validateBusyRoom(guestRequest.room.uid);
    guestRequest.room.busy = true;
    let user: auth.UserRecord | null;
    try {
      user = await auth().getUserByEmail(guestRequest.email);
    } catch (e) {
      user = null
    }

    if (user) {
      auth().updateUser(user.uid, { disabled: false, password: guestRequest.document });
    } else {
      user = await auth().createUser({
        email: guestRequest.email,
        password: guestRequest.document,
        displayName: guestRequest.name + ' ' + guestRequest.lastName,
      });
      auth().setCustomUserClaims(user.uid, { rol: GUEST } as Claim);
    }
    const guest = new Guest();
    guest.uid = user.uid;
    guest.name = guestRequest.name;
    guest.lastName = guestRequest.lastName;
    guest.typeDocument = guestRequest.typeDocument;
    guest.document = guestRequest.document;
    guest.room = guestRequest.room;
    guest.checkIn = guestRequest.checkIn;
    guest.checkOut = guestRequest.checkOut;
    guest.hotel = guestRequest.hotel;
    guest.active = true;
    return firestore()
      .doc(`${Guest.REF}/${guest.uid}`)
      .set(guest.serialize());
  }

  async deleteGuest(uid: string) {
    auth().updateUser(uid, { disabled: true });
    const snap = await firestore()
      .doc(`${Guest.REF}/${uid}`)
      .get();
    const { room } = snap.data()!;
    database()
      .ref(Room.REF)
      .child(room.uid)
      .update({ busy: false });
    return firestore()
      .doc(`${Guest.REF}/${uid}`)
      .update({ active: false });
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
