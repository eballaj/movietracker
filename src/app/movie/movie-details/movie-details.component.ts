import {Component, OnInit} from '@angular/core';
import {MovieDataService} from '../../shared/services/movie-data.service';
import {FirebaseService} from '../../shared/services/firebase.service';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {MatSnackBar} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Actor, Genre, Movie} from '../../models/movieDetails';
import {AngularFirestore} from '@angular/fire/firestore';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieData: Movie;
  similarMovies: any;
  arraySimilarMovies: Movie[];
  genresArray?: Genre[];
  castArray?: Actor[];
  user?: User;
  movieId: number;
  uid;
  sub: Subscription;
  videoUrl?;
  url = 'https://www.youtube.com/embed/';
  videoKey;
  showSpinner = true;
  showError = false;
  existToWatched;
  existToWatch;
  existToFavorite;

  constructor(private movieService: MovieDataService,
              public afs: AngularFirestore,
              private fbService: FirebaseService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private snackBar: MatSnackBar,
              private domSanitizer: DomSanitizer,
              private route: Router) {
  }

  ngOnInit() {
    // get movieId
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.movieId = +params.id;
    });
    // check if movie exist in any list
    this.checkIfExist();
    // get movie details
    this.movieService.getMovieData(this.movieId).subscribe((data) => {
      this.movieData = data;
      this.genresArray = this.movieData.genres;
      this.castArray = this.movieData.credits.cast;
      this.showSpinner = false;
    });
    // get movie trailer and init videoUrl
    this.movieService.getMovieTrailer(this.movieId).subscribe((data) => {
      this.videoKey = data;
      this.videoKey = this.videoKey.videos.results[0].key;
      this.url = this.url + this.videoKey;
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url);
    });
    // get similar movies
    this.movieService.getSimilarMovies(this.movieId).subscribe((data) => {
      this.similarMovies = data;
      if (this.similarMovies.total_results > 0) {
      this.arraySimilarMovies = this.similarMovies.results;
      } else { this.showError = true; }
    });
  }

  snackBarOpen(list, alreadyExists, title) {
    this.snackBar.open(`${alreadyExists? `Removed '${title}' from ` : `Added '${title}' To `} ${list}`, '', {
      duration: 2000,
      horizontalPosition: 'end'
    });
  }

  addFavorite(userId) {
    this.fbService.setFavorite(userId, this.movieData, this.existToFavorite);
    this.snackBarOpen("Favorite", this.existToFavorite, this.movieData.title);

  }

  addWatched(userId) {
    this.fbService.setWatched(userId, this.movieData, this.existToWatched);
    this.snackBarOpen("Watched", this.existToWatched, this.movieData.title);
  }

  addToWatch(userId) {
    this.fbService.setToWatch(userId, this.movieData, this.existToWatch);
    this.snackBarOpen("To Watch", this.existToWatch, this.movieData.title);

  }

  showDetails(id) {
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.route.navigate(['/movieDetails', id]));
  }
  checkIfExist() {
    this.authService.user$.subscribe(user => {
      if(user){
        this.uid = user.uid;
        this.sub = this.afs.doc(`usersData/${this.uid}/watched/${this.movieId}`).valueChanges().subscribe(data => {
          data? this.existToWatched = true: this.existToWatched = false;
        });
        this.sub = this.afs.doc(`usersData/${this.uid}/toWatch/${this.movieId}`).valueChanges().subscribe(data => {
          data? this.existToWatch = true : this.existToWatch = false;
        });
        this.sub = this.afs.doc(`usersData/${this.uid}/favorite/${this.movieId}`).valueChanges().subscribe(data => {
          data? this.existToFavorite = true: this.existToFavorite = false;
        });
    }
  });
  }
}
