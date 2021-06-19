import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as UserActions from './user.actions';
import { UserService } from '@contler/core';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      switchMap((data) => this.useService.getEmployerById(data.uid)),
      map((employer) => UserActions.setUser({ employer })),
    );
  });

  constructor(private actions$: Actions, private useService: UserService) {}
}
