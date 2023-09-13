import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.sass']
})
export class HealthComponent {
  icons = {
    heart: faHeart
  }

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 78, 74, 62, 59, 64 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: '#9ED3FF',
        backgroundColor: 'rgba(158, 211, 255,0.3)'
      }
    ]
  };
}
