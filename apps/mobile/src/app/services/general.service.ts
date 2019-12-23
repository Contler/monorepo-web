import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class GeneralService {
  public hotelColor = "#006633";
  public backgroundHotelColor = "#e4f3eb";

  public searchToolbar: EventEmitter<boolean> = new EventEmitter();
  searchToogle = false;

  constructor() {}

  emitSearchToolbar() {
    this.searchToogle = !this.searchToogle;
    this.searchToolbar.emit(this.searchToogle);
  }
}
