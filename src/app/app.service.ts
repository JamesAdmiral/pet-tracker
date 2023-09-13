import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IAlert {
  type: string;
  content: string;
  link: {
    url: string;
    label: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  alerts: BehaviorSubject<IAlert[]> = new BehaviorSubject<IAlert[]>([]);
  alertCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  fetchData(): void {
    setTimeout(() => {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getEarAlert()))
      this.alertCount.next(this.alerts.value.length);
    }, 2500);
    setTimeout(() => {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getGeoTagAlert()))
      this.alertCount.next(this.alerts.value.length);
    }, 5000);
    setTimeout(() => {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getFoodAlert()))
      this.alertCount.next(this.alerts.value.length);
    }, 10000);
    setTimeout(() => {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getGeoTagAlert()))
      this.alertCount.next(this.alerts.value.length);
    }, 15000);
  }

  private updateAlerts(existingAlerts: IAlert[], newAlert: IAlert): IAlert[] {
    return [newAlert].concat(existingAlerts.filter(a => a.type !== newAlert.type));
  }

  private getEarAlert(): IAlert {
    return {
      type: 'ear',
      content: 'Your pet is exhibiting symptoms of a ear infection. Speak to an online vet at Pawsquad to check everything is okay.',
      link: {
        url: 'https://pawsquad.com/home',
        label: 'Go to Pawsquad'
      }
    }
  }

  private getGeoTagAlert(): IAlert {
    return {
      type: 'geotag',
      content: 'Your pet has left your geotagged boundary!',
      link: {
        url: '',
        label: ''
      }
    }
  }

  private getFoodAlert(): IAlert {
    return {
      type: 'food',
      content: 'Your pet hasn\'t eaten yet today.',
      link: {
        url: '',
        label: ''
      }
    }
  }
}
