import { Component, OnInit } from "@angular/core";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductService } from "@shared/services/product.service";
import { DatePipe } from '@angular/common';
import { CategoryService } from "@shared/services/category.service";
import { DropdownModule } from "primeng/dropdown";

interface iCate {
  id?: number,
  cateName: string
}
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, CommonModule, ButtonModule, ReactiveFormsModule, DropdownModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  productFormGroup!: FormGroup;

  categories!: string[]
  selectedCate: iCate = {
    cateName: ''
  }
  constructor(
    private router: Router,
    private prd_service: ProductService,
    private cate_service: CategoryService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.productFormGroup = new FormGroup({
      productName: new FormControl<string | null>(null, [Validators.required]),
      productPrice: new FormControl<string | null>(null, [Validators.required]),
      productImageUrl: new FormControl<string | null>(null, [Validators.required]),
      productDescription: new FormControl<string | null>(null, [Validators.required]),
    });

    this.cate_service
      .allCategory()
      .subscribe((data) => {
        this.categories = data
      })
  }

  navigate_prd_list() {
    this.router.navigate(['/dashboard/products'])
  }

  onSubmit(prd_form: FormGroup) {
    const currentDate = new Date();

    const formattedDate = this.datePipe.transform(currentDate, 'dd-MM-yyyy', 'UTC+7');

    const product_dto = {
      ...prd_form.value,
      cate: "Fresh",
      productPriceSale: 20,
      productRating: 0,
      productBuyQuantity: 0,
      productViews: 0,
      release_date: formattedDate,
      update_date: ''
    }

    this.prd_service
      .addNewProduct(product_dto)
      .subscribe(() => {
        this.router.navigate(['/dashboard/products'])
      })
  }
}
