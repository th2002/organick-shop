/* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

import { CartService } from '~/shared/services/cart.service';
import { MessageService } from 'primeng/api';
import { cartAction } from '~/ngrx/actions/cart.actions';
import { Store } from '@ngrx/store';
import { IProductCart } from '~/interfaces/i-product-cart';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RatingModule,
    FormsModule,
    CurrencyPipe,
    ToastModule
  ],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input({ required: true }) prd_id!: number;
  @Input({ required: true }) cate!: string;
  @Input({ required: true }) image!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) price_sale!: number;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) rating!: number;
  @Input({ required: true }) views!: number;
  @Input({ required: true }) quantity_buy!: number;

  private store = inject(Store);

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  HandleAddToCart() {
    this.cartService.addToCart({
      id: this.prd_id,
      name: this.name,
      img: this.image,
      price: this.price,
      cate: this.cate,
      quantity: 1
    });

    this.show();
    this.updateCartTotalFromLocalStorage();
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Notification',
      detail: 'Add to cart successfully'
    });
  }

  updateCartTotalFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    const cartItems = cartData ? JSON.parse(cartData) : [];

    const total = cartItems.reduce(
      (acc: number, item: IProductCart) => acc + (item.quantity || 0),
      0
    );

    this.store.dispatch(cartAction.updateCartTotal({ total }));
    this.store.dispatch(cartAction.getProductCart({ products: cartItems }));
  }
}
