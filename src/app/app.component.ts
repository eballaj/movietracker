import { Component } from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel} from '@angular/router';
import {win} from 'ngx-youtube-player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  screenWidth: number;
  constructor(public authService: AuthService,
              public router: Router) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }
  searchMovie(title: string) {
    if (title !== '') {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/search', title , 1]));
    } else {
      this.router.navigate(['/now-playing/1']);
    }
    // title === '' ? this.router.navigate(['/now-playing']) : this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
     // this.router.navigate(['/search', title]));
  }
}
