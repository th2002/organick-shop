import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CartService } from '~/shared/services/cart.service';
import { Store } from '@ngrx/store';
import { cartAction } from '~/ngrx/actions/cart.actions';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectTotal } from '~/ngrx/selectors/cart.selectors';
import { IProductCart } from '~/interfaces/i-product-cart';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SidebarModule, ButtonModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);

  sidebar: boolean = false;
  showPages: boolean = false;

  cartQuantity$!: Observable<number>;
  email: string | null = null;

  constructor(
    private cartService: CartService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.updateCartTotalFromLocalStorage();
    this.getProductsFromLocalStorage();

    this.cartQuantity$ = this.store.select(selectTotal);
    this.auth.get_user_info();
    this.auth.user$.subscribe({
      next: res => (this.email = res?.email || null)
    });
  }

  handleShowPages() {
    this.showPages = !this.showPages;
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

  getProductsFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    const cartItems = cartData ? JSON.parse(cartData) : [];

    this.store.dispatch(cartAction.getProductCart({ products: cartItems }));
  }

  handle_logout() {
    this.auth.logout();
  }
}
