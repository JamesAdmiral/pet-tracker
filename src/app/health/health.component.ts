import { Component, OnInit, ViewChild } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AppService } from '../app.service';
import { BaseChartDirective } from 'ng2-charts';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.sass']
})
export class HealthComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  icons = {
    heart: faHeart
  }
  liveBpm = false;

  public avgBpmChartData: ChartConfiguration<'line'>['data'] = {
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

  public liveBpmChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: '#9ED3FF',
        backgroundColor: 'rgba(158, 211, 255,0.3)'
      }
    ]
  }

  constructor(private service: AppService){}

  ngOnInit(): void {
    this.service.bpm.subscribe(val => {
      this.updateLiveBpmChart(val);
      this.chart.chart?.update();
    });
  }

  updateLiveBpmChart(bpm: number): void {
    const d = new Date();
    const time = `${d.getHours()}:${d.getMinutes()}`;
    this.liveBpmChartData.labels?.push(time);
    this.liveBpmChartData.datasets[0].data.push(bpm);
  }

  toggleBpmView(): void {
    this.liveBpm = !this.liveBpm;
  }

  generateHealthReport(): void {
    const doc = new jsPDF();
    const reportData = this.service.getReportData();
    doc.text(`Health Report\n\n\n${reportData.join('\n')}`, 10, 10);
    doc.save('health-report.pdf');
  }
}
