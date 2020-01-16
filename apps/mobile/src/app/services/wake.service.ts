import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WakeUpEntity } from '@contler/entity';

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

  completeWake(id: number) {
    return this.http.put(environment.apiUrl + 'wake-up/complete', {id})
  }
}
