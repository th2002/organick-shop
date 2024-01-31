import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InvoiceService } from "@shared/services/invoice.service";
import { IInvoice } from "@interfaces/i-invoice";
import { TabViewModule } from 'primeng/tabview';
import { CommonModule, CurrencyPipe } from "@angular/common";
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from "primeng/tag";

@Component({
  selector: 'app-oder-detail',
  standalone: true,
  imports: [TabViewModule, CurrencyPipe, DataViewModule, TagModule, CommonModule],
  templateUrl: './oder-detail.component.html',
  styleUrl: './oder-detail.component.scss'
})
export class OderDetailComponent implements OnInit {
  invoice!: IInvoice
  constructor(private route: ActivatedRoute, private invoice_service: InvoiceService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.invoice_service
      .get_single_invoice(id)
      .subscribe(data => {
        this.invoice = data
      })
  }
}
