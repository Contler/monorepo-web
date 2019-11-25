import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employer, EmployerRequest } from '@contler/core/models';
import { environment } from 'hotel/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, take } from 'rxjs/operators';
import { UserService } from '@contler/core';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EmployerService {
  private url = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private afStore: AngularFirestore,
    private userService: UserService,
  ) {}

  saveEmployer(data: EmployerRequest) {
    return this.http.post<Employer>(this.url + 'user/employer', data);
  }

  getEmployers() {
    return this.userService.getUser().pipe(
      take(1),
      switchMap(user =>
        this.afStore.collection<Employer>(Employer.REF, ref => ref.where('hotel', '==', user.hotel)).valueChanges(),
      ),
      map(employers => employers.map(actualEmployer => plainToClass(Employer, actualEmployer)))
    );
  }

  updateEmployer(employer: Employer) {
    return this.afStore.doc(`${Employer.REF}/${employer.uid}`).update(employer.serialize())
  }

  deleteEmployer(uid: string) {
    return this.http.delete(this.url + `user/employer/${uid}`)
  }
}
