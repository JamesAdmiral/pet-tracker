import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthComponent } from './health/health.component';
import { GpsComponent } from './gps/gps.component';
import { MyPetComponent } from './my-pet/my-pet.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'health' },
  { path: 'alerts', component: AlertsComponent },
  { path: 'health', component: HealthComponent },
  { path: 'gps', component: GpsComponent },
  { path: 'my-pet', component: MyPetComponent },
  { path: 'products', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
