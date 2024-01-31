import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { ProductService } from '@shared/services/product.service';
import { iProduct } from '@interfaces/iProduct';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-products-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RatingModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './products-crud.component.html',
  styleUrl: './products-crud.component.scss'
})
export class ProductsCrudComponent implements OnInit {
  products!: iProduct[];
  searchKeyword = '';
  loading = true;
  constructor(
    private prd_service: ProductService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.prd_service.allProduct().subscribe(data => {
      this.products = data;
      this.loading = false;
    });
  }

  naviagte_add_prd() {
    this.router.navigate(['/dashboard/crud/add-prd']);
  }

  naviagte_edit_prd(id: number) {
    this.router.navigate(['/dashboard/crud/edit-prd/' + id]);
  }

  handle_delete_prd(id: number) {
    this.prd_service.deleteProduct(id).subscribe(() => this.show());
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Delete successfully'
    });
  }
}
