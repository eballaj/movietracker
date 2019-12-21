import {Action} from '@ngrx/store';

export const storeUser = '[User Login] Store User Data';
export const deleteUser = '[User Logout] Delete User Data';
export const validateUser = '[User Login] Validate User';

export class StoreUserData implements Action {
  readonly type = storeUser;
  constructor(public payload: any) {
  }
}
export class DeleteUserData implements Action {
  readonly type = deleteUser;
}
export class ValidateUser implements Action {
  readonly type = validateUser;
  constructor(public payload: any) {
  }
}
