import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared/services/firebase.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDialogComponent} from '../../shared/ui/confirm-dialog/confirm-dialog.component';
import {deleteUser} from '../users.actions';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public firebaseService: FirebaseService, public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public authService: AuthService) { }
  usersArray$: any[];
  userId;
  ngOnInit() {
    this.firebaseService.getAllUsers().subscribe(users => {
        this.usersArray$ = users;
      }
    );
  }
    deleteUser(uid) {
    this.firebaseService.deleteUser(uid);
    this.snackBarOpen();
    }
  snackBarOpen() {
    this.snackBar.open('User Deleted', '', {
      duration: 2000,
      horizontalPosition: 'end'
    });
  }
  openDialog(uid): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: 'Are you sure?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.deleteUser(uid);
      }
    });
  }
  }
