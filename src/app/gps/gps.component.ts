import { Component } from '@angular/core';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.sass']
})
export class GpsComponent {
  center: google.maps.LatLngLiteral = { lat: 51.47912, lng: -3.17280 };
  zoom = 12;
}
