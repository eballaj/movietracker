import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserData } from '../../models/usersData';
import { Movie } from '../../models/movie';
import { User } from '../../models/user';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userId: string;
  favoriteMovies$: Observable<Movie[]>;
  watchedMovies$: Observable<Movie[]>;
  toWatchMovies$: Observable<Movie[]>;
  users;

  constructor(public afs: AngularFirestore, public authService: AuthService) {
  }

  initData() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.favoriteMovies$ = this.afs.collection(`usersData/${this.userId}/favorite`).valueChanges();
        this.watchedMovies$ = this.afs.collection(`usersData/${this.userId}/watched`).valueChanges();
        this.toWatchMovies$ = this.afs.collection(`usersData/${this.userId}/toWatch`).valueChanges();
      }
    },
      error => {
        console.log(error);
      });
  }

  setFavorite(userId, movie, alreadyExists) {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`usersData/${userId}/favorite/${movie.id}`);

    if (!alreadyExists) {
      const userData: UserData = {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePosterUrl: movie.poster_path
      };
      return userRef.set(userData, { merge: true });
    }
    else {
      userRef.delete().then(() => { })
        .catch(error => console.log(error));
    }
  }

  setToWatch(userId, movie, alreadyExists) {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`usersData/${userId}/toWatch/${movie.id}`);
    if (!alreadyExists) {
      const userData: UserData = {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePosterUrl: movie.poster_path
      };
      return userRef.set(userData, { merge: true });
    }
    else {
      userRef.delete().then(() => { })
        .catch(error => console.log(error));
    }
  }

  setWatched(userId, movie, alreadyExists) {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`usersData/${userId}/watched/${movie.id}`);
    if (!alreadyExists) {
      const userData: UserData = {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePosterUrl: movie.poster_path
      };
      return userRef.set(userData, { merge: true });
    }
    else {
      userRef.delete().then(() => { })
        .catch(error => console.log(error));
    }

  }

  addUser(users) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${users.username}`);
    const data: User = {
      uid: users.username,
      displayName: users.name,
      password: users.password,
      email: users.email,
      isAdmin: false
    };
    return userRef.set(data);
  }

  deleteMovie(movieId, movieList) {
    this.afs.doc(`usersData/${this.userId}/${movieList}/${movieId}`).delete().then(() => {
    })
      .catch(error => console.log(error));
  }

  moveItem(movie, addTo, removeFrom?) {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`usersData/${this.userId}/${addTo}/${movie.movieId}`);

    const userData: UserData = {
      movieId: movie.movieId,
      movieTitle: movie.movieTitle,
      moviePosterUrl: movie.moviePosterUrl
    };
    userRef.set(userData, { merge: true });
    if (removeFrom) {
      this.deleteMovie(movie.movieId, removeFrom);
    }
  }
  getAllUsers() {
    // return  this.afs.collection(`users`).valueChanges();
    this.users = this.afs.collection('users').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    }));
    return this.users;
  }
  deleteUser(uid) {
    this.afs.doc(`users/${uid}`).delete();
    this.afs.doc(`usersData/${uid}`).delete();
  }
}
