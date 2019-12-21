import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  url = 'https://api.themoviedb.org/3/movie/';
  searchUrl = 'https://api.themoviedb.org/3/search/movie';
  nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing';
  apiKey = '?api_key=34628c1df38775dfc82a5bb6008aa2d1';
  addCast = '&append_to_response=credits';
  addVideo = '&append_to_response=videos';
  callBack = '&calback=test';
  constructor(private http: HttpClient) {
  }
  getMovieData(movieId: number) {
    return this.http.jsonp(`${this.url}${movieId}${this.apiKey}${this.addCast}${this.callBack}`,
      'callback').pipe(map( res => res));
  }
  getSimilarMovies(movieId: number) {
    return this.http.jsonp(`${this.url}${movieId}/similar${this.apiKey}${this.callBack}`,
      'callback').pipe(map( res => res));
  }
  getMovieTrailer(movieId: number) {
    return this.http.jsonp(`${this.url}${movieId}${this.apiKey}${this.addVideo}${this.callBack}`,
      'callback').pipe(map(res => res));
  }
  searchMovie(title, page): Observable<any> {
    return this.http.jsonp(`${this.searchUrl}${this.apiKey}&query=${title}&page=${page}${this.callBack}`,
      'callback').pipe(map(res => res));
  }
  getNowPlaying( page ) {
    return this.http.jsonp(`${this.nowPlayingUrl}${this.apiKey}&page=${page}${this.callBack}`,
      'callback').pipe(map( res => res));
  }
}
