import { Injectable } from '@angular/core';
import { UserService } from '@contler/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { switchMap, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '@contler/hotel/environments/environment';
import { RoomEntity } from '@contler/entity';
import { getLan } from '@contler/const';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RoomService {
  constructor(
    private userService: UserService,
    private afDb: AngularFireDatabase,
    private http: HttpClient,
    private translate: TranslateService,
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
    const [to, from] = getLan();

    return this.userService.getUser().pipe(
      take(1),
      switchMap((user) =>
        this.http.post<RoomEntity>(environment.apiUrl + `hotel/${user.hotel.uid}/room`, {
          name: this.translate.instant('room.name'),
          number: Number(name),
          to,
          from,
        }),
      ),
    );
  }

  saveRooms(names: string[]) {
    const [to, from] = getLan();
    const roomNames = names.map((name) => ({
      name: this.translate.instant('room.name'),
      number: Number(name),
    }));

    return this.userService.getUser().pipe(
      take(1),
      switchMap((user) =>
        this.http.post<RoomEntity[]>(environment.apiUrl + `hotel/${user.hotel.uid}/rooms`, {
          rooms: roomNames,
          to,
          from,
        }),
      ),
    );
  }
}
