import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartDataset, ChartOptions } from 'chart.js';
import { InvoiceService } from '@shared/services/invoice.service';
import { IInvoice } from '@interfaces/i-invoice';
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

  invoices!: IInvoice[];
  data_chart: number[] = [];
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
      this.filter_invoices();

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
            data: [...this.data_chart]
          }
        ]
      };
    });

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
          suggestedMin: 0,
          suggestedMax: 2500
        }
      }
    };
  }

  filter_invoices() {
    const filtered: IInvoice[] = this.invoices?.filter(
      item => item.status === 'Done'
    );
    for (let i = 1; i <= 12; i++) {
      const monthString: string = i < 10 ? `0${i}` : `${i}`;
      const invoicesByMonth: IInvoice[] = filtered.filter(item =>
        item.date.includes(`-${monthString}-`)
      );
      const totalAmountByMonth: number = invoicesByMonth.reduce(
        (pre, cur) => pre + cur.total,
        0
      );

      this.data_chart[i - 1] = totalAmountByMonth;
    }
  }
}
