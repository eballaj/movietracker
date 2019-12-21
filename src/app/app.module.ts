import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

import {UserModule} from './user/user.module';
import {MaterialModule} from './material/material.module';

import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
// import { SearchComponent } from './movie/search/search.component';
// import { NowPlayingComponent } from './movie/now-playing/now-playing.component';
// import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import {AuthService} from './shared/services/auth.service';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {FirebaseService} from './shared/services/firebase.service';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
// import { SpinnerComponent } from './ui/spinner/spinner.component';
import {MovieModule} from './movie/movie.module';
import {StateModule} from './shared/state/state.module';
import {ConfirmDialogComponent} from './shared/ui/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent
    // SearchComponent,
    // NowPlayingComponent,
    // MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MovieModule,
    UserModule,
    MaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxYoutubePlayerModule,
    StateModule
  ],
  providers: [AuthService, AngularFireAuth, FirebaseService],
  exports: [],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
