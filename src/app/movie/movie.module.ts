import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import {MovieDetailsComponent} from './movie-details/movie-details.component';
import {NowPlayingComponent} from './now-playing/now-playing.component';
import {SearchComponent} from './search/search.component';
import {MaterialModule} from '../material/material.module';
import {UserModule} from '../user/user.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MovieDetailsComponent, NowPlayingComponent, SearchComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MaterialModule,
    UserModule,
    FormsModule
  ],
  exports: [
    MovieDetailsComponent,
    NowPlayingComponent,
    SearchComponent
  ]
})
export class MovieModule { }
