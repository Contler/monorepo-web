import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WakeUpEntity } from '@contler/entity';
import { environment } from 'hotel/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WakeService {

  constructor(private http: HttpClient) { }

  getWakeIncomplete(idHotel: string) {
    return this.http.get<WakeUpEntity[]>(environment.apiUrl + `hotel/${idHotel}/wake?complete=false`)
  }

  getWakeComplete(idHotel: string) {
    return this.http.get<WakeUpEntity[]>(environment.apiUrl + `hotel/${idHotel}/wake?complete=true`)
  }
}
