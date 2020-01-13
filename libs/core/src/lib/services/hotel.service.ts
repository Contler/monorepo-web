import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Hotel } from '@contler/models';
import { map, switchMap, take } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserService } from 'lib/lib/services/user.service';

@Injectable()
export class HotelService {
  constructor(private afStore: AngularFirestore, private userService: UserService) {}

  getHotel() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user => this.afStore.doc<Hotel>(`${Hotel.REF}/${user.hotel!}`).valueChanges()),
      map(data => plainToClass(Hotel, data)),
    );
  }
}
