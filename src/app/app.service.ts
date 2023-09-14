import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IAlert {
  type: string;
  content: string;
  link: {
    url: string;
    label: string;
  }
}

interface IResponse {
  PetID: 1,
  BPM: number;
  EarAlert: boolean;
  FoodAlert: boolean;
  DrinkAlert: boolean;
  GeoTagAlert: boolean;
  DateTimeStamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  _baseUrl = '/api/getData';
  _count = 0;
  _requestInterval = 5000;
  _data: IResponse[] = [];

  alerts: BehaviorSubject<IAlert[]> = new BehaviorSubject<IAlert[]>([]);
  alertCount: BehaviorSubject<number> = new BehaviorSubject(0);
  bpm: Subject<number> = new Subject();

  constructor(private http: HttpClient) {}

  parseData(data: IResponse): void {
    if (data.EarAlert) {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getEarAlert()))
      this.alertCount.next(this.alerts.value.length);
    }
    if (data.FoodAlert) {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getFoodAlert()))
      this.alertCount.next(this.alerts.value.length);
    }
    if (data.GeoTagAlert) {
      this.alerts.next(this.updateAlerts(this.alerts.value, this.getGeoTagAlert()))
      this.alertCount.next(this.alerts.value.length);
    }
    if (data.BPM) {
      this.bpm.next(data.BPM);
    }
    this._data.push(data);
  }

  async fetchData() {
    const url = '/data-api/rest/PetHealth';
    // this.http.get(url).subscribe(data => {
    //   console.log(data)
    // })
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    setInterval(() => {
      this.http.get(`${this._baseUrl}?record=${this._count}`).subscribe((data) => {
        this._count++;
        this.parseData(data as IResponse);
      });
    }, this._requestInterval);
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

  public removeAlert(alertType: string): void {
    this.alerts.next(this.alerts.value.filter(a => a.type !== alertType))
    this.alertCount.next(this.alerts.value.length);
  }

  public getReportData(): string[] {
    const report = [];

    if (this._data.some(d => d.EarAlert)) {
      report.push('This animal has exhibited symptoms of ear infection.');
    }

    if (this._data.reduce((acc, d) => acc + d.BPM, 0) / this._data.length > 80) {
      report.push('This animal has an elevated heart rate.');
    }

    return report;
  }
}
