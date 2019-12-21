import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Store} from '@ngrx/store';
import {StateModel} from '../../shared/state/state.model';
import {StoreUserData, ValidateUser} from '../users.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  result;
  constructor(public authService: AuthService, public afs: FirebaseService, public store: Store<StateModel>) {
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
  // this.result = this.authService.validateUserIdentity(this.loginForm.value);
   // this.store.dispatch(new ValidateUser(this.loginForm.value));
  }
}
