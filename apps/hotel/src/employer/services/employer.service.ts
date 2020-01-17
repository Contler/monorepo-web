import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employer, EmployerRequest } from '@contler/models';
import { environment } from 'hotel/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '@contler/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ADMIN } from '@contler/const';
import { EmployerEntity } from '@contler/entity';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private afDb: AngularFireDatabase,
    private userService: UserService,
  ) {}

  saveEmployer(data: EmployerRequest) {
    return this.http.post<Employer>(this.url + 'employer', data);
  }

  getEmployers() {
    return this.userService.getUser().pipe(
      switchMap(user => this.http.get<EmployerEntity[]>(this.url + `hotel/${user.hotel.uid}/employer`)),
      map(employers => employers.filter(employer => employer.role !== ADMIN)),
    );
  }

  updateEmployer(employer: EmployerEntity) {
    return this.http.put(this.url + 'employer', { ...employer });
  }

  deleteEmployer(uid: string) {
    return this.http.delete(this.url + `employer/${uid}`);
  }
}
