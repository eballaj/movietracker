
import {State} from './users.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const userState = createFeatureSelector<State>('user');

export function getUserData() {
  return createSelector( userState, (state: State) => state.userData);
}
