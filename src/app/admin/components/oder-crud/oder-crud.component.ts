import { Component, OnInit } from "@angular/core";
import { TableModule } from "primeng/table";
import { InvoiceService } from "@shared/services/invoice.service";
import { IInvoice } from "@interfaces/i-invoice";
import { CurrencyPipe } from "@angular/common";
import { TagModule } from "primeng/tag";
import { ButtonModule } from 'primeng/button';
import { Router } from "@angular/router";
@Component({
  selector: 'app-oder-crud',
  standalone: true,
  imports: [TableModule, CurrencyPipe, TagModule, ButtonModule],
  templateUrl: './oder-crud.component.html',
  styleUrl: './oder-crud.component.scss'
})
export class OderCrudComponent implements OnInit {
  invoices!: IInvoice[]
  data_sorted: IInvoice[] = []
  constructor(private invoice_service: InvoiceService, private router: Router) {}

  ngOnInit() {
    this.invoice_service
      .get_all_invoices()
      .subscribe((data: IInvoice[]) => {
        this.filter_invoices(data)
        this.invoices = this.data_sorted
      })
  }

  getSeverity(status: string): 'success' | "warning" | "danger" | undefined{
    switch (status) {
      case 'Done':
        return 'success';
      case 'Delivering':
        return 'warning';
      case 'Cancel':
        return 'danger';
      default:
        return undefined;
    }
  }

  filter_invoices(data: IInvoice[]) {
    const filtered: IInvoice[] = data
    const new_data: IInvoice[] = []
    const sort_new_data: IInvoice[] = []
    for (let i = 1; i <= 12; i++) {
      const monthString: string = i < 10 ? `0${i}` : `${i}`;
      const invoicesByMonth: IInvoice[] = filtered.filter(item =>
        item.date.includes(`-${monthString}-`)
      );
      new_data.push(...invoicesByMonth);
    }

    for (let i = new_data.length; i > 0; i--) {
      sort_new_data.push(new_data[i])
    }
    this.data_sorted = sort_new_data
  }

  navigate_detail(id: number) {
    this.router.navigate(['dashboard/oder/' + id])
  }
}
