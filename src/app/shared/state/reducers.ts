import {ActionReducerMap} from '@ngrx/store';
import {StateModel} from './state.model';
import {userReducer} from '../../user/users.reducer';

export const reducers: ActionReducerMap<StateModel> = {
  user: userReducer
};
