import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { iProduct } from '@interfaces/iProduct';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-oder-list',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './oder-list.component.html',
  styleUrl: './oder-list.component.scss'
})
export class OderListComponent implements OnInit {
  products!: iProduct[];

  constructor(private prd_service: ProductService) {}

  ngOnInit() {
    this.handle_get_all_prd();
  }

  handle_get_all_prd() {
    this.prd_service.allProduct().subscribe(data => {
      const data_sorted = data.sort((a: iProduct, b: iProduct) => {
        const a_sales = a.productBuyQuantity;
        const b_sales = b.productBuyQuantity;
        return b_sales - a_sales;
      });
      this.products = data_sorted;
    });
  }
}
