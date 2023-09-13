import { Component } from '@angular/core';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.sass']
})
export class GpsComponent {
  mapOptions: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  }
}
