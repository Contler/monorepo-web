import { Injectable } from '@angular/core';
import { UserService } from '@contler/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { RoomEntity } from '@contler/entity';

@Injectable()
export class RoomService {
  constructor(private userService: UserService, private afDb: AngularFireDatabase, private http: HttpClient) {}

  getRoom() {
    return this.userService
      .getUser()
      .pipe(switchMap(user => this.http.get<RoomEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/room`)));
  }

  deleteRoom(roomUid: string) {
    return this.http.delete(environment.apiUrl + `room/${roomUid}`)
  }

  saveRoom(name: string) {
    return this.userService
      .getUser()
      .pipe(switchMap(user => this.http.post<RoomEntity>(environment.apiUrl + `hotel/${user.hotel.uid}/room`, { name })));
  }
}
