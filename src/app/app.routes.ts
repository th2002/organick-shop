import { HomeComponent } from '~/pages/home/home.component';
import { AboutUsComponent } from '~/pages/about-us/about-us.component';
import { ContactUsComponent } from '~/pages/contact-us/contact-us.component';
import { ShopComponent } from '~/pages/shop/shop.component';
import { ProductDetailComponent } from '~/pages/product-detail/product-detail.component';
import { PaymentComponent } from '~/pages/payment/payment.component';
import { PostsComponent } from '~/pages/posts/posts.component';
import { SigninSignupComponent } from '~/pages/signin-signup/signin-signup.component';
import { PageNotFoundComponent } from '~/pages/page-not-found/page-not-found.component';

import { CartDetailComponent } from '~/customer/cart-detail/cart-detail.component';
import { ProfileComponent } from '~/customer/profile/profile.component';
import { PurchaseHistoryComponent } from '~/customer/purchase-history/purchase-history.component';

import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '~/admin/components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '@shared/services/auth.guard';
import { LayoutAdminComponent } from '@shared/layouts/layout-admin/layout-admin.component';
import { DefaultLayoutComponent } from '@shared/layouts/default-layout/default-layout.component';
import { ProductsCrudComponent } from '@admin/components/products-crud/products-crud.component';
import { UsersCrudComponent } from '@admin/components/users-crud/users-crud.component';

export const routes: Routes = [
  // Admin dashboard layout
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: LayoutAdminComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'products', component: ProductsCrudComponent },
      { path: 'users', component: UsersCrudComponent },
      { path: '', component: AdminDashboardComponent }
    ]
  },

  // Default layout
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login-signup', component: SigninSignupComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'cart', component: CartDetailComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'purchase/:id', component: PurchaseHistoryComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];
