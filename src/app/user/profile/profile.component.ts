import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(public authService: AuthService,
              public firebaseService: FirebaseService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.firebaseService.initData();
  }

  snackBarOpen(list?) {
    if (list) {
      this.snackBar.open('Added to ' + list, '', {
        duration: 2000,
        horizontalPosition: 'end'
      });
    } else {
      this.snackBar.open('Movie Deleted', '', {
        duration: 2000,
        horizontalPosition: 'end'
      });
    }
}
}
