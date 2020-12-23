import { Injectable } from '@angular/core';
import { UserService } from '@contler/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'hotel/environments/environment';
import { RoomEntity } from '@contler/entity';
import { getLan } from '@contler/const';

@Injectable()
export class RoomService {
  constructor(
    private userService: UserService,
    private afDb: AngularFireDatabase,
    private http: HttpClient,
  ) {}

  getRoom() {
    return this.userService
      .getUser()
      .pipe(
        switchMap((user) => this.http.get<RoomEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/room`)),
      );
  }

  deleteRoom(roomUid: string) {
    return this.http.delete(environment.apiUrl + `room/${roomUid}`);
  }

  saveRoom(name: number) {
    const [actualLan, languages] = getLan();

    return this.userService.getUser().pipe(
      take(1),
      switchMap((user) =>
        this.http.post<RoomEntity>(environment.apiUrl + `hotel/${user.hotel.uid}/room`, {
          name,
          actualLan,
          languages,
        }),
      ),
    );
  }

  saveRooms(names: string[]) {
    const [actualLan, languages] = getLan();

    return this.userService.getUser().pipe(
      take(1),
      switchMap((user) =>
        this.http.post<RoomEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/rooms`, {
          names,
          actualLan,
          languages,
        }),
      ),
    );
  }
}
