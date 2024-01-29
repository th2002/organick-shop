import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartDataset, ChartOptions } from "chart.js";
@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss'
})
export class RevenueChartComponent implements OnInit {
  data: { labels: string[]; datasets: ChartDataset[] } | undefined;

  options: ChartOptions | undefined;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: '#22a6b3',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [
            6500, 5900, 5000, 4100, 7600, 5500, 4000, 6600, 4500, 3000, 2000,
            7800
          ]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        title: {
          display: true,
          text: 'Revenue statistics',
          color: textColor,
          font: {
            size: 16,
            weight: 'bold'
          }
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
          },
          suggestedMin: 0,
          suggestedMax: 8000
        }
      }
    };
  }
}
