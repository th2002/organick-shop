import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { iProduct } from '~/interfaces/iProduct';
import { ProductService } from '~/shared/services/product.service';
import { BannerPageComponent } from '~/components/banner-page/banner-page.component';
import { BannerSubscribeComponent } from '~/components/banner-subscribe/banner-subscribe.component';
import { BreadcrumbComponent } from '~/components/breadcrumb/breadcrumb.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    CurrencyPipe,
    BannerPageComponent,
    BannerSubscribeComponent,
    BreadcrumbComponent,
    RatingModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  title: string = 'Shop Single';
  background_url: string = 'assets/images/banners/background_shop_single.png';
  pattern_url: string = 'assets/images/banners/pattern_shop_single.png';
  slug = [
    { label: 'Shop', routerLink: '/shop' },
    { label: 'Shop Single', routerLink: '.' }
  ];

  all_product_data: iProduct[] = [];
  prd_data_copy: iProduct[] = [];

  product!: iProduct;

  quantity_input_value: string = '1';

  constructor(
    private route: ActivatedRoute,
    private product_service: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProduct().then(() => {
      const product_id = +this.route.snapshot.params['id'];

      const found_product = this.all_product_data.find(
        chil => chil.id === product_id
      );

      if (found_product) {
        this.product = found_product;
      }
    });
  }

  getAllProduct(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.product_service.allProduct().subscribe(
        data => {
          this.all_product_data = data;
          this.prd_data_copy = data;
          resolve();
        },
        error => {
          console.log('My error', error);
          reject(error);
        }
      );
    });
  }
}
