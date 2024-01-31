import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iProduct } from '@interfaces/iProduct';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CategoryService } from '@shared/services/category.service';

interface iCate {
  id?: number;
  cateName: string;
}
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  _prd!: iProduct;
  productFormGroup!: FormGroup;

  categories!: string[];
  selectedCate: iCate = {
    cateName: ''
  };
  constructor(
    private prd_service: ProductService,
    private cate_service: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const prd_id = this.route.snapshot.params['id'];
    this.prd_service.singleProduct(prd_id).subscribe(data => {
      this._prd = data;
      this.selectedCate.cateName = data.cate;

      this.productFormGroup.patchValue({
        productName: this._prd.productName,
        productPrice: this._prd.productPrice,
        productImageUrl: this._prd.productImageUrl,
        productDescription: this._prd.productDescription
      });
    });

    this.productFormGroup = new FormGroup({
      productName: new FormControl<string | null>(null, [Validators.required]),
      productPrice: new FormControl<string | null>(null, [Validators.required]),
      productImageUrl: new FormControl<string | null>(null, [
        Validators.required
      ]),
      productDescription: new FormControl<string | null>(null, [
        Validators.required
      ])
    });

    this.cate_service.allCategory().subscribe(data => {
      this.categories = data;
    });
  }

  navigate_prd_list() {
    this.router.navigate(['/dashboard/products']);
  }

  onSubmit(prd_form: FormGroup) {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(
      currentDate,
      'dd-MM-yyyy',
      'UTC+7'
    );

    const product_dto = {
      ...prd_form.value,
      cate: this.selectedCate.cateName,
      update_date: formattedDate
    };

    this.prd_service.updateProduct(this._prd.id, product_dto).subscribe(() => {
      this.router.navigate(['/dashboard/products']);
    });
  }
}
