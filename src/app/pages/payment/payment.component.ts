import { Component, inject, OnInit } from "@angular/core";
import { BannerPageComponent } from "@components/banner-page/banner-page.component";
import { BreadcrumbComponent } from "@components/breadcrumb/breadcrumb.component";
import { BannerSubscribeComponent } from "@components/banner-subscribe/banner-subscribe.component";
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, NgIf } from "@angular/common";
import { InputNumberModule } from "primeng/inputnumber";
import { MessageService, SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { Store } from "@ngrx/store";
import { CartService } from "@shared/services/cart.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { selectProductsCart } from "~/ngrx/selectors/cart.selectors";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';
import { InvoiceService } from "@shared/services/invoice.service";
import { ToastModule } from "primeng/toast";

interface IItem {
    productId: string;
    cate: string;
    image: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

interface IOder {
  date: string,
  status: string,
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: IItem[];
  subtotal: number;
  total: number;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    BannerPageComponent,
    BreadcrumbComponent,
    BannerSubscribeComponent,
    AsyncPipe,
    CurrencyPipe,
    InputNumberModule,
    NgIf,
    SharedModule,
    TableModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{
  title: string = 'Checkout';
  background_url: string = 'assets/images/banners/background_cart.png';
  pattern_url: string = 'assets/images/banners/pattern_cart.png';
  slug = [
    { label: 'Shop', routerLink: '/shop' },
    { label: 'Cart', routerLink: '/cart' },
    { label: 'Checkout', routerLink: '.' }
  ];

  private store = inject(Store);
  total_cart: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private invoice_service: InvoiceService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}
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

  invoice: IOder  = {
    date: '',
    status: 'Delivering',
    customer: {
      name: '',
      email: '',
      address: ''
    },
    items:  [],
    subtotal: 0,
    total: 0
  }

  onCheckout() {
    const cart_data = this.cartService.getCartItems();
    cart_data.map(item => {
      this.invoice.items.push(<IItem>{
        productId: '',
        cate: item.cate,
        image: item.img,
        quantity: item.quantity,
        unitPrice: item.price * item.quantity
      });
    });
    this.invoice.subtotal = this.total_cart
    this.invoice.total = this.total_cart
    const currentDate = new Date();

    const formattedDate: string = this.datePipe.transform(
      currentDate,
      'dd-MM-yyyy',
      'UTC+7'
    ) || ""
    this.invoice.date = formattedDate
    console.log(this.invoice);

    this.invoice_service
      .add_new_invoice(this.invoice)
      .subscribe(res => {
        console.log(res);
        this.show()
      })
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Checkout successfully'
    });
  }
}
