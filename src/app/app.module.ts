import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HealthComponent } from './health/health.component';
import { GpsComponent } from './gps/gps.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyPetComponent } from './my-pet/my-pet.component';
import { ProductsComponent } from './products/products.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    HealthComponent,
    GpsComponent,
    MyPetComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
