import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { iProduct } from '~/interfaces/iProduct';
import { ProductService } from '~/shared/services/product.service';
import { CategoryService } from '~/shared/services/category.service';

import { CardProductComponent } from '~/components/card-product/card-product.component';
import { BannerPageComponent } from '~/components/banner-page/banner-page.component';
import { BreadcrumbComponent } from '~/components/breadcrumb/breadcrumb.component';
import { PaginatorComponent } from '~/components/paginator/paginator.component';
import { BannerSubscribeComponent } from '~/components/banner-subscribe/banner-subscribe.component';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ICategory } from '~/interfaces/i-category';

interface i_price_option {
  title: string;
}

interface i_rating_option {
  title: string;
  value: number;
}

interface i_view_option {
  title: string;
}

interface i_quantity_buy_option {
  title: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    FormsModule,
    CardProductComponent,
    BannerPageComponent,
    BreadcrumbComponent,
    PaginatorComponent,
    BannerSubscribeComponent,
    InputTextModule,
    DropdownModule,
    RatingModule,
    SkeletonModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  title: string = 'Shop';
  background_url: string = 'assets/images/banners/background_shop.png';
  pattern_url: string = 'assets/images/banners/pattern_shop.png';
  slug = [{ label: 'Shop', routerLink: '/shop' }];

  loaded: boolean = false;

  message: string = '';
  length_data: number = 0;

  all_product_data!: iProduct[];
  prd_data_copy!: iProduct[];

  all_cate_data!: ICategory[];
  cate_option!: ICategory;

  price_option: i_price_option[] = [
    {
      title: 'Ascending'
    },
    {
      title: 'Decrease'
    }
  ];
  price_selected!: i_price_option;

  rating_option: i_rating_option[] = [
    {
      title: '⭐',
      value: 1
    },
    {
      title: '⭐⭐',
      value: 2
    },
    {
      title: '⭐⭐⭐',
      value: 3
    },
    {
      title: '⭐⭐⭐⭐',
      value: 4
    },
    {
      title: '⭐⭐⭐⭐⭐',
      value: 5
    }
  ];
  rating_selected!: i_rating_option;

  views_option: i_view_option[] = [
    {
      title: 'Ascending'
    },
    {
      title: 'Decrease'
    }
  ];
  views_selected!: i_view_option;

  quantity_buy_option: i_quantity_buy_option[] = [
    {
      title: 'Ascending'
    },
    {
      title: 'Decrease'
    }
  ];
  quantity_buy_selected!: i_view_option;

  searchValue: string = '';

  selectedCities!: [];

  constructor(
    private product_service: ProductService,
    private category_service: CategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProduct().then(() => {
      this.getAllCategories();
      this.updateDisplayedProducts();
    });

    setTimeout(() => {
      this.loaded = true;
    }, 1500);
  }

  getAllProduct(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.product_service.allProduct().subscribe(
        data => {
          this.all_product_data = data;
          this.prd_data_copy = data;
          this.length_data = data.length;
          resolve();
        },
        error => {
          console.log('My error', error);
          reject(error);
        }
      );
    });
  }

  getAllCategories() {
    this.category_service.allCategory().subscribe(
      data => {
        this.all_cate_data = data;
      },
      error => {
        console.log('My error', error);
      }
    );
  }

  handleFilterPrd() {
    this.all_product_data =
      this.searchValue || this.cate_option || this.rating_selected
        ? this.prd_data_copy.filter(
            item =>
              item.productName
                .toLowerCase()
                .includes(this.searchValue.toLowerCase()) &&
              (this.cate_option
                ? item.cate
                    .toLowerCase()
                    .includes(this.cate_option.cateName.toLowerCase())
                : true) &&
              (this.rating_selected
                ? Math.floor(item.productRating) === this.rating_selected.value
                : true)
          )
        : [...this.prd_data_copy];

    if (this.price_selected) {
      console.log(this.price_selected);

      if (this.price_selected.title === 'Ascending') {
        this.all_product_data.sort((a, b) => a.productPrice - b.productPrice);
      } else if (this.price_selected.title === 'Decrease') {
        this.all_product_data.sort((a, b) => b.productPrice - a.productPrice);
      }
    }

    if (this.views_selected) {
      if (this.views_selected.title === 'Ascending') {
        this.all_product_data.sort((a, b) => a.productViews - b.productViews);
      } else if (this.views_selected.title === 'Decrease') {
        this.all_product_data.sort((a, b) => b.productViews - a.productViews);
      }
    }

    if (this.quantity_buy_selected) {
      if (this.quantity_buy_selected.title === 'Ascending') {
        this.all_product_data.sort(
          (a, b) => a.productBuyQuantity - b.productBuyQuantity
        );
      } else if (this.quantity_buy_selected.title === 'Decrease') {
        this.all_product_data.sort(
          (a, b) => b.productBuyQuantity - a.productBuyQuantity
        );
      }
    }

    this.message =
      this.all_product_data.length === 0
        ? 'Không tìm thấy sản phẩm phù hợp'
        : '';
  }

  currentPage: number = 1;
  first: number = 0;
  rows: number = 10;

  handlePageChange(event: { first: number; rows: number; page: number }) {
    this.currentPage = event.page + 1;
    this.updateDisplayedProducts();

    this.loaded = false;

    setTimeout(() => {
      this.loaded = true;
    }, 1500);
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.rows;

    const endIndex = startIndex + this.rows;
    this.all_product_data = this.prd_data_copy.slice(startIndex, endIndex);
  }
}
