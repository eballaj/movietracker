import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './search/search.component';
import {NowPlayingComponent} from './now-playing/now-playing.component';
import {MovieDetailsComponent} from './movie-details/movie-details.component';

const routes: Routes = [
  {
    path : 'search/:title/:page', component : SearchComponent
  },
  {
    path: 'nowPlaying/:page', component : NowPlayingComponent
  },
  {
    path: 'movieDetails/:id', component : MovieDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
