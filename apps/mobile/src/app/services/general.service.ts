import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class GeneralService {
  public hotelColor = "#006633";
  public hotelSecondColor = "#006633";
  public backgroundHotelColor = "#e4f3eb";

  public searchToolbar: EventEmitter<boolean> = new EventEmitter();
  searchToogle = false;

  constructor(private auth: AuthService) {
    auth.$user.subscribe(user => {
      this.hotelColor = user!.hotel.color;
      this.hotelSecondColor = user!.hotel.colorSecond;
      this.backgroundHotelColor = user!.hotel.colorSecond + '21'
    })
  }

  emitSearchToolbar() {
    this.searchToogle = !this.searchToogle;
    this.searchToolbar.emit(this.searchToogle);
  }
}
