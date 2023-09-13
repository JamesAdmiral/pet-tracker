import { Component } from '@angular/core';
import { faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppService, IAlert } from '../app.service';



@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.sass']
})
export class AlertsComponent {
  alerts: IAlert[] = []
  arrowIcon = faArrowRight;
  closeIcon = faTimes;

  constructor(private service: AppService) {
    this.service.alerts.subscribe(val => {
      this.alerts = val;
    })
  }
}
