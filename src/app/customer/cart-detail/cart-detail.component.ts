import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerPageComponent } from '~/components/banner-page/banner-page.component';
import { BreadcrumbComponent } from '~/components/breadcrumb/breadcrumb.component';
import { BannerSubscribeComponent } from '~/components/banner-subscribe/banner-subscribe.component';

import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProductsCart } from '~/ngrx/selectors/cart.selectors';
import { CartService } from '~/shared/services/cart.service';
import { cartAction } from '~/ngrx/actions/cart.actions';
import { IProductCart } from '~/interfaces/i-product-cart';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BannerPageComponent,
    BreadcrumbComponent,
    BannerSubscribeComponent,
    TableModule,
    InputNumberModule
  ],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.scss'
})
export class CartDetailComponent implements OnInit {
  title: string = 'My Shopping Cart';
  background_url: string = 'assets/images/banners/background_cart.png';
  pattern_url: string = 'assets/images/banners/pattern_cart.png';
  slug = [
    { label: 'Shop', routerLink: '/shop' },
    { label: 'Cart', routerLink: '.' }
  ];

  private store = inject(Store);
  total_cart: number = 0;

  constructor(private cartService: CartService, private router: Router) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products$!: Observable<any[]>;

  ngOnInit(): void {
    this.products$ = this.store.select(selectProductsCart);
    this.handleTotalCart();
  }

  handleTotalCart() {
    const cart_data = this.cartService.getCartItems();
    this.total_cart = cart_data.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  handleDeleteProductInCart(product_id: number) {
    this.cartService.deleteProductFromCart(product_id);
    const cart_data = this.cartService.getCartItems();
    this.store.dispatch(cartAction.getProductCart({ products: cart_data }));
    this.handleTotalCart();
  }

  handleChangeQuantityProduct(prd_id: number, event: number) {
    const cart_data = this.cartService.getCartItems();

    const existingProduct = cart_data.find(item => item.id === prd_id);

    if (existingProduct) {
      existingProduct.quantity = event;
    }

    localStorage.setItem('cart', JSON.stringify(cart_data));
    this.handleTotalCart();
    this.updateCartTotalFromLocalStorage();
  }

  updateCartTotalFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    const cartItems = cartData ? JSON.parse(cartData) : [];

    const total = cartItems.reduce(
      (acc: number, item: IProductCart) => acc + (item.quantity || 0),
      0
    );

    this.store.dispatch(cartAction.updateCartTotal({ total }));
  }

  navigate_to_checkout() {
    this.router.navigate(['/payment'])
  }
}
