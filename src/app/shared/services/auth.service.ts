import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as fromActions from '../../user/users.actions';
import {Store} from '@ngrx/store';
import {StateModel} from '../state/state.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private store: Store<StateModel>) {
    // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );
  }
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.router.navigate(['/nowPlaying/1']);
    this.store.dispatch(new fromActions.StoreUserData(credential.user));
    return this.updateUserData(credential.user);
  }
/*  async emailSignin(email, pass) {
   // const provider = new auth.EmailAuthProvider();
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    this.router.navigate(['/nowPlaying']);
    return this.updateUserData(credential.user);
  }*/

  /*public validateUserIdentity(userCred) {
    let userData = {};
    const user = this.afs.doc<User>(`users/${userCred.username}`).valueChanges();
    user.subscribe(data => {
      if (data) {
        userData = data;
        if (data.uid === userCred.username && data.password === userCred.password ) {
          if (data.isAdmin) {
            this.user$ = new Observable<User>(observe => {
              observe.next(data);
            });
            data.password = null;
            this.store.dispatch(new fromActions.StoreUserData(data));
            this.router.navigate(['/nowPlaying/1']);
          } else {
            data.password = null;
            this.store.dispatch(new fromActions.StoreUserData(data));
            this.user$ = new Observable<User>(observe => {
            observe.next(data);
         });
            this.router.navigate(['/nowPlaying/1']);
            console.log('correct');
          }
        } else {
          console.log('wrong');
        }
      } else {
        console.log('User does not exist');
      }
    });
}*/
  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: user.uid === 'wW1pG1CCZfPhTfOhZPwHpQNmcEj1'
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    this.store.dispatch(new fromActions.DeleteUserData());
    await this.afAuth.auth.signOut();
    // this.user$ = of(null);
    this.router.navigate(['nowPlaying/1']);
  }
}
