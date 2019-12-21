import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Movie } from '../../models/movieDetails';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieDataService} from '../../shared/services/movie-data.service';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../shared/services/auth.service';
import {FirebaseService} from '../../shared/services/firebase.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchInput: string;
  data?: any;
  arrayMovie?: Movie[];
  showSpinner = true;
  page = 1;
  totalPage;
  totalResults;
  constructor(private httpClient: HttpClient,
              private movieService: MovieDataService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private authService: AuthService,
              private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.searchInput = params.title;
      this.page = +params.page;
    });
    this.movieService.searchMovie(this.searchInput, this.page)
      .subscribe(
        (data) => {
          this.data = data;
          this.totalResults = this.data.total_results;
          this.totalPage = this.data.total_pages;
          this.arrayMovie = this.data.results;
          this.showSpinner = false;
        }
      );
  }
  nextPage() {
    this.showSpinner = true;
    this.page++;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.route.navigate(['/search', this.searchInput, this.page]));
    window.scrollTo(0, 0);
  }
  previewsPage() {
    this.showSpinner = true;
    this.page--;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.route.navigate(['/search', this.searchInput, this.page]));
  }
  lastPage() {
    this.showSpinner = true;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.route.navigate(['/search', this.searchInput, this.totalPage]));
  }
  firsPage() {
    this.showSpinner = true;
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.route.navigate(['/search', this.searchInput, 1]));
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
