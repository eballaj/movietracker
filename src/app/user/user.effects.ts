import { Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import * as fromActions from './users.actions';
import {AuthService} from '../shared/services/auth.service';
import {Store} from '@ngrx/store';
import {StateModel} from '../shared/state/state.model';
import {getUserData} from './users.selector';
import {StoreUserData, ValidateUser} from './users.actions';
import {of} from 'rxjs';

@Injectable()
export class UserEffects {

/* @Effect() isValid$ = this.action$.pipe(ofType<ValidateUser>(fromActions.validateUser),
   switchMap((data) => of(this.authService.validateUserIdentity(data.payload))
     .pipe(map(res => new StoreUserData(res)))));*/

  constructor(private action$: Actions, private authService: AuthService, private store: Store<StateModel>) { }
}
