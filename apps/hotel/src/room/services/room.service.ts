import { Injectable } from '@angular/core';
import { UserService } from '@contler/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Room } from '@contler/core/models';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable()
export class RoomService {
  constructor(private userService: UserService, private afDb: AngularFireDatabase) {}

  getRoom() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user =>
        this.afDb.list<Room>(Room.REF, ref => ref.orderByChild('hotel').equalTo(user.hotel!)).valueChanges(),
      ),
    );
  }

  deleteRoom(roomUid: string) {
    return this.afDb.object(`${Room.REF}/${roomUid}`).remove()
  }

  saveRoom(name: string, zone: string) {
    return this.userService.getUser().pipe(
      take(1),
      map(user => new Room(zone, name, user.hotel!, this.afDb.createPushId()!)),
      switchMap(room => this.afDb.object(`${Room.REF}/${room.uid}`).set(room.serialize())),
    );
  }
}
