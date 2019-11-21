import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Hotel } from 'lib/models';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';

@Injectable()
export class HotelService {
  private $hotelObs: Observable<Hotel> | null = null;

  constructor(private afStore: AngularFirestore) {}

  loadHotel(hotelId: string) {
    this.$hotelObs = this.afStore
      .collection(Hotel.REF)
      .doc<Hotel>(hotelId)
      .valueChanges()
      .pipe(map(data => plainToClass(Hotel, data)));
    return this.$hotel
  }

  get $hotel() {
    return this.$hotelObs
  }
}
