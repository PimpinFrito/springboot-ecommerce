import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  getCartItems(): CartItem[] {
    return this.cartService.cartItems;
  }

  ngOnInit(): void {
    this.cartService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    this.cartService.computeCartTotals();
  }

  increaseQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  decreaseQuantity(cartItem: CartItem) {
    this.cartService.decreaseQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
