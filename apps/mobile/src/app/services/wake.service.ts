import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WakeUpEntity } from '@contler/entity';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WakeService {
  private wakeCompleteSubject = new BehaviorSubject<WakeUpEntity[]>([]);
  private wakeIncompleteSubject = new BehaviorSubject<WakeUpEntity[]>([]);

  constructor(private http: HttpClient) {}

  getWakeIncomplete(idHotel: string) {
    return this.http
      .get<WakeUpEntity[]>(environment.apiUrl + `hotel/${idHotel}/wake?complete=false`)
      .pipe(tap(wake => this.wakeIncompleteSubject.next(wake)));
  }

  getWakeComplete(idHotel: string) {
    return this.http
      .get<WakeUpEntity[]>(environment.apiUrl + `hotel/${idHotel}/wake?complete=true`)
      .pipe(tap(wake => this.wakeCompleteSubject.next(wake)));
  }

  completeWake(id: number) {
    return this.http.put(environment.apiUrl + 'wake-up/complete', { id }).pipe(
      tap(() => {
        const wake = this.wakeIncompleteSubject.getValue().find(w => w.id === id);
        this.wakeIncompleteSubject.next(this.wakeIncompleteSubject.getValue().filter(w => w.id !== id));
        wake!.complete = true;
        this.wakeCompleteSubject.next([...this.wakeCompleteSubject.getValue(), wake!]);
      }),
    );
  }

  get $wakeComplete() {
    return this.wakeCompleteSubject.asObservable();
  }

  get $wakeIncomplete() {
    return this.wakeIncompleteSubject.asObservable();
  }
}
