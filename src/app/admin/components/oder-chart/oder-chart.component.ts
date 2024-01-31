import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartDataset, ChartOptions } from 'chart.js';
import { IInvoice } from '@interfaces/i-invoice';
import { InvoiceService } from '@shared/services/invoice.service';

@Component({
  selector: 'app-oder-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './oder-chart.component.html',
  styleUrl: './oder-chart.component.scss'
})
export class OderChartComponent implements OnInit {
  data: { labels: string[]; datasets: ChartDataset[] } | undefined;
  options: ChartOptions | undefined;

  data_chart_oder: number[] = [];
  invoices!: IInvoice[];

  constructor(private invoice_service: InvoiceService) {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.invoice_service.get_all_invoices().subscribe(data => {
      this.invoices = data;
      this.filter_quantity_invoices();

      this.data = {
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
            label: 'Oders',
            data: [...this.data_chart_oder],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4
          },
          {
            label: 'Users',
            data: [2, 1, 3, 15, 5, 13, 5],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--pink-500'),
            tension: 0.4
          }
        ]
      };
    });

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          },
          min: 0,
          max: 20
        }
      }
    };
  }

  filter_quantity_invoices() {
    const filtered: IInvoice[] = this.invoices;
    for (let i = 1; i <= 12; i++) {
      const monthString: string = i < 10 ? `0${i}` : `${i}`;
      const invoicesByMonth: IInvoice[] = filtered.filter(item =>
        item.date.includes(`-${monthString}-`)
      );
      // const totalInvoiceByMonth: number = invoicesByMonth.reduce((pre, cur) => pre + cur.total, 0);
      this.data_chart_oder[i - 1] = invoicesByMonth.length;
    }
  }
}
