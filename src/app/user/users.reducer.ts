import {Action} from '@ngrx/store';
import * as fromUserActions from './users.actions';
export interface State {
  userData?: any;
}
export const initialState: State = {
  userData: null
};
export function userReducer(state = initialState, action: Action) {
  switch (action.type) {
    case fromUserActions.storeUser:
      return {
        ...state,
        userData: (action as fromUserActions.StoreUserData).payload
      };
    case fromUserActions.deleteUser:
      return {
        userData: null
      };
    default: return state;
  }
}
