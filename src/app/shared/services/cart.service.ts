/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { IProductCart } from '../../interfaces/i-product-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: IProductCart[] = [];

  constructor() {
    this.loadCart();
  }

  getCartItems(): IProductCart[] {
    return this.cartItems;
  }

  addToCart(product: IProductCart): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.updateLocalStorage();
  }

  deleteProductFromCart(prd_id: number) {
    const newCart = this.cartItems.filter(item => item.id !== prd_id);
    this.cartItems = newCart;

    this.updateLocalStorage();
  }

  private loadCart(): void {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = storedCart;
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
