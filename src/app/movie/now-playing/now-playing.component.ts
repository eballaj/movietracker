import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieDataService} from '../../shared/services/movie-data.service';
import {Movie} from '../../models/movieDetails';
import {AuthService} from '../../shared/services/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit {

  data?: any;
  arrayMovie: Movie[];
  page;

  totalPage;
  showSpinner = true;
  constructor(private httpClient: HttpClient,
              private route: Router,
              private movieService: MovieDataService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private firebaseService: FirebaseService
            ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.page = +params.page;
      this.movieService.getNowPlaying(this.page).subscribe(  (data) => {
        this.data = data;
        this.totalPage = this.data.total_pages;
        this.arrayMovie = this.data.results;
        this.showSpinner = false;
      });
    });
  }
  showDetails(id) {
   this.route.navigate(['/movieDetails', id]);
  }
  nextPage() {
    this.showSpinner = true;
    this.page++;
    this.route.navigate(['/nowPlaying', this.page]);
    window.scrollTo(0, 0);
  }
  previewsPage() {
    this.showSpinner = true;
    this.page--;
    this.route.navigate(['/nowPlaying', this.page]);
    window.scrollTo(0, 0);
  }
  lastPage() {
    this.showSpinner = true;
    this.route.navigate(['/nowPlaying', this.totalPage]);
  }
  firsPage() {
    this.showSpinner = true;
    this.route.navigate(['/nowPlaying', 1]);
  }
  isDisabled() {
    return this.page === 1 || this.page < 1;
  }
  isNextDisabled() {
    return this.page === this.totalPage || this.page > this.totalPage;
  }
  addToWatch(userId, movie) {
    this.firebaseService.setToWatch(userId, movie);
  }
  snackBarOpen(list) {
    this.snackBar.open('Added To ' + list, '', {
      duration: 2000,
      horizontalPosition: 'end'
    });
  }
}
