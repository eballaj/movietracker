import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../shared/services/firebase.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(public fbs: FirebaseService,
              public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.registerForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
    this.fbs.addUser(this.registerForm.value);
    this.registerForm.reset();
    this.snackBarOpen();
  }
  snackBarOpen() {
    this.snackBar.open('Registered successfully', '', {
      duration: 2000,
      horizontalPosition: 'end'
    });
  }

}
