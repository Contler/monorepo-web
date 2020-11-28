import { Injectable, Optional } from '@angular/core';
import { CoreConfig } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { HotelEntity } from '@contler/entity';

@Injectable()
export class HotelService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = this.config.urlBackend;
  }

  getAllHotels() {
    return this.http.get<HotelEntity[]>(this.url + 'hotel');
  }
}
