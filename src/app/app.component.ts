import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faHeart, faCompass, faDog, faShoppingCart, faBell } from '@fortawesome/free-solid-svg-icons';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  activeUrl = '';
  alertCount = 0;
  title = 'pet-tracker';
  icons = {
    health: faHeart,
    alerts: faBell,
    gps: faCompass,
    pet: faDog,
    products: faShoppingCart
  };

  constructor(private router: Router, private service: AppService) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activeUrl = this.router.url;
      }
    });
    this.service.alertCount.subscribe(val => {
      this.alertCount = val;
    })
  }

  ngOnInit(): void {
    this.service.fetchData();
  }
}