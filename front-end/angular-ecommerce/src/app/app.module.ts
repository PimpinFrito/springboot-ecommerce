import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import {
  authHttpInterceptorFn,
  AuthModule,
  AuthService,
  provideAuth0,
} from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { MembersComponent } from './components/members/members.component';

import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AuthIntercepterService } from './services/auth-intercepter.service';

const routes: Routes = [
  {
    path: 'members',
    component: MembersComponent,
  },
  {
    path: 'orderhistory',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SidebarMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginButtonComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
    MembersComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    AuthModule.forRoot(environment.auth),
  ],
  providers: [
    AuthService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// provideAuth0({
//   domain: 'dev-eawonebv5dnnraat.us.auth0.com',
//   clientId: 'LZpBpacNI3TN0I7wtzxe5GOVO2QYwE2q',
//   authorizationParams: {
//     redirect_uri: window.location.origin,
//     audience: 'https://dev-eawonebv5dnnraat.us.auth0.com/api/v2/',
//     scope: 'read:current_user',
//   },
//   httpInterceptor: {
//     allowedList: [
//       {
//         uri: 'https://dev-eawonebv5dnnraat.us.auth0.com/api/v2/*',
//         tokenOptions: {
//           authorizationParams: {
//             audience: 'https://dev-eawonebv5dnnraat.us.auth0.com/api/v2/',
//             scope: 'read:current_user',
//           },
//         },
//       },
//     ],
//   },
// })
