import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faHeart, faCompass, faDog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  activeUrl = '';
  title = 'pet-tracker';
  icons = {
    health: faHeart,
    gps: faCompass,
    pet: faDog
  };

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activeUrl = this.router.url;
      }
    });
  }
}