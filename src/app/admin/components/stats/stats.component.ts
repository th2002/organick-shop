import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '@shared/services/invoice.service';
import { IInvoice } from '@interfaces/i-invoice';
import { CurrencyPipe } from '@angular/common';
import { HttpMethodService } from '~/core/services/http-method.service';

interface iUser {
  id: number;
  email: string;
  password: string;
  typeUser: 0 | 1;
}
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  total_oder!: number;
  total_amount!: number;
  total_user!: number;
  constructor(
    private invoice_service: InvoiceService,
    private http: HttpMethodService
  ) {}

  ngOnInit() {
    this.invoice_service.get_all_invoices().subscribe((data: IInvoice[]) => {
      this.total_oder = data.length;
      this.total_amount = data.reduce((pre, cur) => pre + cur.total, 0);
    });

    this.http.get('http://localhost:3000/users').subscribe((data: iUser[]) => {
      this.total_user = data.length;
    });
  }
}
