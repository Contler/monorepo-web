import { Injectable, Optional } from '@angular/core';
import { CoreConfig } from '@contler/models';
import { HttpClient } from '@angular/common/http';
import { EmployerEntity, HotelEntity } from '@contler/entity';

@Injectable()
export class HotelService {
  private readonly url: string;

  constructor(@Optional() private config: CoreConfig, private http: HttpClient) {
    this.url = this.config.urlBackend;
  }

  getAllHotels() {
    return this.http.get<HotelEntity[]>(this.url + 'hotel');
  }

  getAdminHotel(id: string) {
    return this.http.get<EmployerEntity[]>(`${this.url}hotel/${id}/admin`);
  }

  getUserHotel(id: string) {
    return this.http.get<HotelEntity>(`${this.url}hotel/user/${id}`);
  }

  getHotel(id: string) {
    return this.http.get<HotelEntity>(`${this.url}hotel/${id}`);
  }

  createHotel(req: any) {
    return this.http.post<EmployerEntity>(`${this.url}employer/admin`, req);
  }

  updateHotel(hotel: HotelEntity) {
    return this.http.post(`${this.url}hotel`, hotel);
  }

  deleteHotel(uid: string) {
    return this.http.delete(`${this.url}hotel/${uid}`);
  }
}
